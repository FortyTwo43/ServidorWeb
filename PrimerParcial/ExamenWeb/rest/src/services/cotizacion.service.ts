import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CotizacionService } from 'seguros-auto-backend';
import { CreateCotizacionDto, UpdateCotizacionDto, CotizacionResponseDto } from 'seguros-auto-backend';
import { Cotizacion } from 'seguros-auto-backend';
import { EstadoCotizacion } from 'seguros-auto-backend';
import { v4 as uuidv4 } from 'uuid';
import { WebhookService } from './webhook.service';

@Injectable()
export class CotizacionDataService {
  private cotizaciones: Cotizacion[] = [];

  constructor(
    private readonly domainCotizacionService: CotizacionService,
    private readonly webhookService: WebhookService,
  ) {}

  async crearCotizacion(createCotizacionDto: CreateCotizacionDto): Promise<CotizacionResponseDto> {
    const fechaInicio = new Date(createCotizacionDto.fechaInicio);
    const fechaFin = new Date(createCotizacionDto.fechaFin);
    const fechaVencimiento = createCotizacionDto.fechaVencimiento
      ? new Date(createCotizacionDto.fechaVencimiento)
      : undefined;

    // Validar fechas usando domain service
    if (!this.domainCotizacionService.validarFechasCotizacion(fechaInicio, fechaFin, fechaVencimiento)) {
      throw new BadRequestException('Las fechas de la cotización no son válidas');
    }

    const nuevaCotizacion: Cotizacion = {
      id: uuidv4(),
      montoTotal: createCotizacionDto.montoTotal,
      prima: createCotizacionDto.prima,
      estado: createCotizacionDto.estado ?? EstadoCotizacion.PENDIENTE,
      fechaInicio,
      fechaFin,
      fechaVencimiento,
      observaciones: createCotizacionDto.observaciones,
      vehiculoId: createCotizacionDto.vehiculoId,
      coberturaId: createCotizacionDto.coberturaId,
      conductorId: createCotizacionDto.conductorId,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      vehiculo: undefined as any,
      cobertura: undefined as any,
      conductor: undefined as any,
    };

    this.cotizaciones.push(nuevaCotizacion);
    const response = this.mapearAResponseDto(nuevaCotizacion);

    // Enviar notificación al webhook
    await this.webhookService.notificar(
      nuevaCotizacion.id,
      'cotizacion',
      'creado',
      response,
    );

    return response;
  }

  async obtenerTodas(): Promise<CotizacionResponseDto[]> {
    return this.cotizaciones.map(c => this.mapearAResponseDto(c));
  }

  async obtenerPorId(id: string): Promise<CotizacionResponseDto> {
    const cotizacion = this.cotizaciones.find(c => c.id === id);
    if (!cotizacion) {
      throw new NotFoundException(`Cotización con ID ${id} no encontrada`);
    }
    return this.mapearAResponseDto(cotizacion);
  }

  async obtenerPorVehiculo(vehiculoId: string): Promise<CotizacionResponseDto[]> {
    return this.cotizaciones
      .filter(c => c.vehiculoId === vehiculoId)
      .map(c => this.mapearAResponseDto(c));
  }

  async obtenerPorConductor(conductorId: string): Promise<CotizacionResponseDto[]> {
    return this.cotizaciones
      .filter(c => c.conductorId === conductorId)
      .map(c => this.mapearAResponseDto(c));
  }

  async obtenerPorEstado(estado: EstadoCotizacion): Promise<CotizacionResponseDto[]> {
    return this.cotizaciones
      .filter(c => c.estado === estado)
      .map(c => this.mapearAResponseDto(c));
  }

  async actualizar(id: string, updateCotizacionDto: UpdateCotizacionDto): Promise<CotizacionResponseDto> {
    const indice = this.cotizaciones.findIndex(c => c.id === id);
    if (indice === -1) {
      throw new NotFoundException(`Cotización con ID ${id} no encontrada`);
    }

    const updateData: any = { ...updateCotizacionDto };
    if (updateData.fechaInicio && typeof updateData.fechaInicio === 'string') {
      updateData.fechaInicio = new Date(updateData.fechaInicio);
    }
    if (updateData.fechaFin && typeof updateData.fechaFin === 'string') {
      updateData.fechaFin = new Date(updateData.fechaFin);
    }
    if (updateData.fechaVencimiento && typeof updateData.fechaVencimiento === 'string') {
      updateData.fechaVencimiento = new Date(updateData.fechaVencimiento);
    }

    this.cotizaciones[indice] = {
      ...this.cotizaciones[indice],
      ...updateData,
      fechaActualizacion: new Date(),
    };

    const response = this.mapearAResponseDto(this.cotizaciones[indice]);

    // Enviar notificación al webhook
    await this.webhookService.notificar(
      id,
      'cotizacion',
      'actualizado',
      response,
    );

    return response;
  }

  async aprobar(id: string): Promise<CotizacionResponseDto> {
    return this.actualizarEstado(id, EstadoCotizacion.APROBADA);
  }

  async rechazar(id: string): Promise<CotizacionResponseDto> {
    return this.actualizarEstado(id, EstadoCotizacion.RECHAZADA);
  }

  async marcarVencida(id: string): Promise<CotizacionResponseDto> {
    return this.actualizarEstado(id, EstadoCotizacion.VENCIDA);
  }

  async eliminar(id: string): Promise<void> {
    const indice = this.cotizaciones.findIndex(c => c.id === id);
    if (indice === -1) {
      throw new NotFoundException(`Cotización con ID ${id} no encontrada`);
    }
    this.cotizaciones.splice(indice, 1);
  }

  async verificarVencidas(): Promise<CotizacionResponseDto[]> {
    const ahora = new Date();
    const vencidas = this.cotizaciones.filter(
      c =>
        c.fechaVencimiento &&
        c.fechaVencimiento < ahora &&
        c.estado === EstadoCotizacion.PENDIENTE
    );

    for (const cotizacion of vencidas) {
      cotizacion.estado = EstadoCotizacion.VENCIDA;
      cotizacion.fechaActualizacion = new Date();
    }

    return vencidas.map(c => this.mapearAResponseDto(c));
  }

  obtenerListaCotizaciones(): Cotizacion[] {
    return this.cotizaciones;
  }

  private async actualizarEstado(id: string, estado: EstadoCotizacion): Promise<CotizacionResponseDto> {
    const indice = this.cotizaciones.findIndex(c => c.id === id);
    if (indice === -1) {
      throw new NotFoundException(`Cotización con ID ${id} no encontrada`);
    }

    this.cotizaciones[indice].estado = estado;
    this.cotizaciones[indice].fechaActualizacion = new Date();

    const response = this.mapearAResponseDto(this.cotizaciones[indice]);

    // Enviar notificación al webhook con la operación según el estado
    const operacion = estado === EstadoCotizacion.APROBADA ? 'aprobado' : 
                      estado === EstadoCotizacion.RECHAZADA ? 'rechazado' : 
                      'actualizado';
    
    await this.webhookService.notificar(
      id,
      'cotizacion',
      operacion,
      response,
    );

    return response;
  }

  private mapearAResponseDto(cotizacion: Cotizacion): CotizacionResponseDto {
    return {
      id: cotizacion.id,
      montoTotal: cotizacion.montoTotal,
      prima: cotizacion.prima,
      estado: cotizacion.estado,
      fechaInicio: cotizacion.fechaInicio,
      fechaFin: cotizacion.fechaFin,
      fechaVencimiento: cotizacion.fechaVencimiento,
      observaciones: cotizacion.observaciones,
      vehiculoId: cotizacion.vehiculoId,
      coberturaId: cotizacion.coberturaId,
      conductorId: cotizacion.conductorId,
      fechaCreacion: cotizacion.fechaCreacion,
      fechaActualizacion: cotizacion.fechaActualizacion,
    };
  }
}

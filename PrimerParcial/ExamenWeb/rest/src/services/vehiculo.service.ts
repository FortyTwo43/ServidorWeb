import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { VehiculoService } from 'seguros-auto-backend';
import { CreateVehiculoDto, UpdateVehiculoDto, VehiculoResponseDto } from 'seguros-auto-backend';
import { Vehiculo } from 'seguros-auto-backend';
import { v4 as uuidv4 } from 'uuid';
import { WebhookService } from './webhook.service';

@Injectable()
export class VehiculoDataService {
  private vehiculos: Vehiculo[] = [];

  constructor(
    private readonly domainVehiculoService: VehiculoService,
    private readonly webhookService: WebhookService,
  ) {}

  async crearVehiculo(createVehiculoDto: CreateVehiculoDto): Promise<VehiculoResponseDto> {
    if (
      createVehiculoDto.placa &&
      !this.domainVehiculoService.validarPlacaUnica(createVehiculoDto.placa, this.vehiculos)
    ) {
      throw new ConflictException('Ya existe un vehículo con esta placa');
    }

    if (
      createVehiculoDto.vin &&
      !this.domainVehiculoService.validarVinUnico(createVehiculoDto.vin, this.vehiculos)
    ) {
      throw new ConflictException('Ya existe un vehículo con este VIN');
    }

    const nuevoVehiculo: Vehiculo = {
      id: uuidv4(),
      tipo: createVehiculoDto.tipo,
      marca: createVehiculoDto.marca,
      modelo: createVehiculoDto.modelo,
      anioFabricacion: createVehiculoDto.anioFabricacion,
      placa: createVehiculoDto.placa,
      vin: createVehiculoDto.vin,
      color: createVehiculoDto.color,
      numeroMotor: createVehiculoDto.numeroMotor,
      valorComercial: createVehiculoDto.valorComercial,
      conductorId: createVehiculoDto.conductorId,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      conductor: undefined as any,
      cotizaciones: [],
    };

    this.vehiculos.push(nuevoVehiculo);
    const response = this.mapearAResponseDto(nuevoVehiculo);

    // Enviar notificación al webhook
    await this.webhookService.notificar(
      nuevoVehiculo.id,
      'vehiculo',
      'creado',
      response,
    );

    return response;
  }

  async obtenerTodos(): Promise<VehiculoResponseDto[]> {
    return this.vehiculos.map(v => this.mapearAResponseDto(v));
  }

  async obtenerPorId(id: string): Promise<VehiculoResponseDto> {
    const vehiculo = this.vehiculos.find(v => v.id === id);
    if (!vehiculo) {
      throw new NotFoundException(`Vehículo con ID ${id} no encontrado`);
    }
    return this.mapearAResponseDto(vehiculo);
  }

  async obtenerPorConductor(conductorId: string): Promise<VehiculoResponseDto[]> {
    return this.vehiculos
      .filter(v => v.conductorId === conductorId)
      .map(v => this.mapearAResponseDto(v));
  }

  async actualizar(id: string, updateVehiculoDto: UpdateVehiculoDto): Promise<VehiculoResponseDto> {
    const indice = this.vehiculos.findIndex(v => v.id === id);
    if (indice === -1) {
      throw new NotFoundException(`Vehículo con ID ${id} no encontrado`);
    }

    if (updateVehiculoDto.placa) {
      const otroConPlaca = this.vehiculos.find(v => v.placa === updateVehiculoDto.placa && v.id !== id);
      if (otroConPlaca) {
        throw new ConflictException('Ya existe otro vehículo con esta placa');
      }
    }

    if (updateVehiculoDto.vin) {
      const otroConVin = this.vehiculos.find(v => v.vin === updateVehiculoDto.vin && v.id !== id);
      if (otroConVin) {
        throw new ConflictException('Ya existe otro vehículo con este VIN');
      }
    }

    this.vehiculos[indice] = {
      ...this.vehiculos[indice],
      ...updateVehiculoDto,
      fechaActualizacion: new Date(),
    };

    const response = this.mapearAResponseDto(this.vehiculos[indice]);

    // Enviar notificación al webhook
    await this.webhookService.notificar(
      id,
      'vehiculo',
      'actualizado',
      response,
    );

    return response;
  }

  async eliminar(id: string): Promise<void> {
    const indice = this.vehiculos.findIndex(v => v.id === id);
    if (indice === -1) {
      throw new NotFoundException(`Vehículo con ID ${id} no encontrado`);
    }
    this.vehiculos.splice(indice, 1);
  }

  obtenerListaVehiculos(): Vehiculo[] {
    return this.vehiculos;
  }

  private mapearAResponseDto(vehiculo: Vehiculo): VehiculoResponseDto {
    return {
      id: vehiculo.id,
      tipo: vehiculo.tipo,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      anioFabricacion: vehiculo.anioFabricacion,
      placa: vehiculo.placa,
      vin: vehiculo.vin,
      color: vehiculo.color,
      numeroMotor: vehiculo.numeroMotor,
      valorComercial: vehiculo.valorComercial,
      conductorId: vehiculo.conductorId,
      fechaCreacion: vehiculo.fechaCreacion,
      fechaActualizacion: vehiculo.fechaActualizacion,
    };
  }
}

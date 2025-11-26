import { Injectable, NotFoundException } from '@nestjs/common';
import { CoberturaService } from 'seguros-auto-backend';
import { CreateCoberturaDto, UpdateCoberturaDto, CoberturaResponseDto } from 'seguros-auto-backend';
import { Cobertura } from 'seguros-auto-backend';
import { TipoCobertura, TipoSeguro } from 'seguros-auto-backend';
import { v4 as uuidv4 } from 'uuid';
import { WebhookService } from './webhook.service';

@Injectable()
export class CoberturaDataService {
  private coberturas: Cobertura[] = [];

  constructor(
    private readonly domainCoberturaService: CoberturaService,
    private readonly webhookService: WebhookService,
  ) {
    this.inicializarCoberturasDefault();
  }

  async crearCobertura(createCoberturaDto: CreateCoberturaDto): Promise<CoberturaResponseDto> {
    const nuevaCobertura: Cobertura = {
      id: uuidv4(),
      tipoCobertura: createCoberturaDto.tipoCobertura,
      tipoSeguro: createCoberturaDto.tipoSeguro,
      monto: createCoberturaDto.monto,
      descripcion: createCoberturaDto.descripcion,
      deducible: createCoberturaDto.deducible,
      condiciones: createCoberturaDto.condiciones,
      activa: createCoberturaDto.activa ?? true,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      cotizaciones: [],
    };

    this.coberturas.push(nuevaCobertura);
    const response = this.mapearAResponseDto(nuevaCobertura);

    // Enviar notificación al webhook
    await this.webhookService.notificar(
      nuevaCobertura.id,
      'cobertura',
      'creado',
      response,
    );

    return response;
  }

  async obtenerTodas(): Promise<CoberturaResponseDto[]> {
    return this.coberturas
      .filter(c => c.activa)
      .map(c => this.mapearAResponseDto(c));
  }

  async obtenerPorId(id: string): Promise<CoberturaResponseDto> {
    const cobertura = this.coberturas.find(c => c.id === id);
    if (!cobertura) {
      throw new NotFoundException(`Cobertura con ID ${id} no encontrada`);
    }
    return this.mapearAResponseDto(cobertura);
  }

  async obtenerPorTipo(tipoCobertura: TipoCobertura, tipoSeguro?: TipoSeguro): Promise<CoberturaResponseDto[]> {
    let filtradas = this.coberturas.filter(c => c.tipoCobertura === tipoCobertura && c.activa);
    if (tipoSeguro) {
      filtradas = filtradas.filter(c => c.tipoSeguro === tipoSeguro);
    }
    return filtradas.map(c => this.mapearAResponseDto(c));
  }

  async actualizar(id: string, updateCoberturaDto: UpdateCoberturaDto): Promise<CoberturaResponseDto> {
    const indice = this.coberturas.findIndex(c => c.id === id);
    if (indice === -1) {
      throw new NotFoundException(`Cobertura con ID ${id} no encontrada`);
    }

    this.coberturas[indice] = {
      ...this.coberturas[indice],
      ...updateCoberturaDto,
      fechaActualizacion: new Date(),
    };

    const response = this.mapearAResponseDto(this.coberturas[indice]);

    // Enviar notificación al webhook
    await this.webhookService.notificar(
      id,
      'cobertura',
      'actualizado',
      response,
    );

    return response;
  }

  async desactivar(id: string): Promise<void> {
    const indice = this.coberturas.findIndex(c => c.id === id);
    if (indice === -1) {
      throw new NotFoundException(`Cobertura con ID ${id} no encontrada`);
    }
    this.coberturas[indice].activa = false;
    this.coberturas[indice].fechaActualizacion = new Date();
  }

  obtenerListaCoberturas(): Cobertura[] {
    return this.coberturas;
  }

  private inicializarCoberturasDefault(): void {
    const coberturasDefault = [
      {
        tipoCobertura: TipoCobertura.BASICA,
        tipoSeguro: TipoSeguro.TERCEROS,
        monto: 50000000,
        descripcion: 'Cobertura básica de responsabilidad civil hacia terceros',
        deducible: 1000000,
        condiciones: 'Aplica para daños a terceros únicamente',
      },
      {
        tipoCobertura: TipoCobertura.LIMITADA,
        tipoSeguro: TipoSeguro.TERCEROS,
        monto: 100000000,
        descripcion: 'Cobertura limitada con mayor protección para terceros',
        deducible: 800000,
        condiciones: 'Incluye daños materiales y personales a terceros',
      },
      {
        tipoCobertura: TipoCobertura.AMPLIA,
        tipoSeguro: TipoSeguro.TODO_RIESGO,
        monto: 200000000,
        descripcion: 'Cobertura completa todo riesgo',
        deducible: 500000,
        condiciones: 'Incluye todo riesgo, hurto, incendio, daños propios y a terceros',
      },
    ];

    this.coberturas = coberturasDefault.map(c => ({
      id: uuidv4(),
      ...c,
      activa: true,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      cotizaciones: [],
    }));
  }

  private mapearAResponseDto(cobertura: Cobertura): CoberturaResponseDto {
    return {
      id: cobertura.id,
      tipoCobertura: cobertura.tipoCobertura,
      tipoSeguro: cobertura.tipoSeguro,
      monto: cobertura.monto,
      descripcion: cobertura.descripcion,
      deducible: cobertura.deducible,
      condiciones: cobertura.condiciones,
      activa: cobertura.activa,
      fechaCreacion: cobertura.fechaCreacion,
      fechaActualizacion: cobertura.fechaActualizacion,
    };
  }
}

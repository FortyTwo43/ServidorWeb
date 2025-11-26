import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ConductorService } from 'seguros-auto-backend';
import { CreateConductorDto, UpdateConductorDto, ConductorResponseDto } from 'seguros-auto-backend';
import { Conductor } from 'seguros-auto-backend';
import { v4 as uuidv4 } from 'uuid';
import { WebhookService } from './webhook.service';

@Injectable()
export class ConductorDataService {
  private conductores: Conductor[] = []; // Persistencia en memoria

  constructor(
    private readonly domainConductorService: ConductorService,
    private readonly webhookService: WebhookService,
  ) {}

  /**
   * Crear un nuevo conductor
   * Usa validaciones del domain service
   */
  async crearConductor(createConductorDto: CreateConductorDto): Promise<ConductorResponseDto> {
    // Validaciones de persistencia usando el domain service
    if (
      createConductorDto.numeroLicencia &&
      !this.domainConductorService.validarLicenciaUnica(createConductorDto.numeroLicencia, this.conductores)
    ) {
      throw new ConflictException('Ya existe un conductor con este número de licencia');
    }

    if (
      createConductorDto.documentoIdentidad &&
      !this.domainConductorService.validarDocumentoUnico(createConductorDto.documentoIdentidad, this.conductores)
    ) {
      throw new ConflictException('Ya existe un conductor con este documento de identidad');
    }

    // Crear conductor
    const nuevoConductor: Conductor = {
      id: uuidv4(),
      nombre: createConductorDto.nombre,
      apellido: createConductorDto.apellido,
      correoElectronico: createConductorDto.correoElectronico,
      telefono: createConductorDto.telefono,
      documentoIdentidad: createConductorDto.documentoIdentidad,
      direccion: createConductorDto.direccion,
      numeroLicencia: createConductorDto.numeroLicencia,
      fechaNacimiento: createConductorDto.fechaNacimiento
        ? new Date(createConductorDto.fechaNacimiento)
        : undefined,
      aniosExperiencia: createConductorDto.aniosExperiencia,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      vehiculos: [],
      cotizaciones: [],
    };

    // Guardar en memoria
    this.conductores.push(nuevoConductor);
    const response = this.mapearAResponseDto(nuevoConductor);

    // Enviar notificación al webhook
    await this.webhookService.notificar(
      nuevoConductor.id,
      'conductor',
      'creado',
      response,
    );

    return response;
  }

  /**
   * Obtener todos los conductores
   */
  async obtenerTodos(): Promise<ConductorResponseDto[]> {
    return this.conductores.map(conductor => this.mapearAResponseDto(conductor));
  }

  /**
   * Obtener conductor por ID
   */
  async obtenerPorId(id: string): Promise<ConductorResponseDto> {
    const conductor = this.conductores.find(c => c.id === id);
    if (!conductor) {
      throw new NotFoundException(`Conductor con ID ${id} no encontrado`);
    }
    return this.mapearAResponseDto(conductor);
  }

  /**
   * Actualizar conductor
   */
  async actualizar(id: string, updateConductorDto: UpdateConductorDto): Promise<ConductorResponseDto> {
    const indiceConductor = this.conductores.findIndex(c => c.id === id);
    if (indiceConductor === -1) {
      throw new NotFoundException(`Conductor con ID ${id} no encontrado`);
    }

    // Validar email único si se está actualizando
    if (updateConductorDto.correoElectronico) {
      const otroConEmail = this.conductores.find(
        c => c.correoElectronico === updateConductorDto.correoElectronico && c.id !== id
      );
      if (otroConEmail) {
        throw new ConflictException('Ya existe otro conductor con este correo electrónico');
      }
    }

    // Validar licencia única si se está actualizando
    if (updateConductorDto.numeroLicencia) {
      const otroConLicencia = this.conductores.find(
        c => c.numeroLicencia === updateConductorDto.numeroLicencia && c.id !== id
      );
      if (otroConLicencia) {
        throw new ConflictException('Ya existe otro conductor con este número de licencia');
      }
    }

    // Validar documento único si se está actualizando
    if (updateConductorDto.documentoIdentidad) {
      const otroConDocumento = this.conductores.find(
        c => c.documentoIdentidad === updateConductorDto.documentoIdentidad && c.id !== id
      );
      if (otroConDocumento) {
        throw new ConflictException('Ya existe otro conductor con este documento de identidad');
      }
    }

    // Convertir fechas si es necesario
    const updateData: any = { ...updateConductorDto };
    if (updateData.fechaNacimiento && typeof updateData.fechaNacimiento === 'string') {
      updateData.fechaNacimiento = new Date(updateData.fechaNacimiento);
    }

    // Actualizar
    this.conductores[indiceConductor] = {
      ...this.conductores[indiceConductor],
      ...updateData,
      fechaActualizacion: new Date(),
    };

    const response = this.mapearAResponseDto(this.conductores[indiceConductor]);

    // Enviar notificación al webhook
    await this.webhookService.notificar(
      id,
      'conductor',
      'actualizado',
      response,
    );

    return response;
  }

  /**
   * Eliminar conductor
   */
  async eliminar(id: string): Promise<void> {
    const indiceConductor = this.conductores.findIndex(c => c.id === id);
    if (indiceConductor === -1) {
      throw new NotFoundException(`Conductor con ID ${id} no encontrado`);
    }

    this.conductores.splice(indiceConductor, 1);
  }

  /**
   * Buscar conductores por nombre
   */
  async buscarPorNombre(nombre: string): Promise<ConductorResponseDto[]> {
    const conductoresFiltrados = this.conductores.filter(
      conductor =>
        conductor.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
        conductor.apellido.toLowerCase().includes(nombre.toLowerCase())
    );
    return conductoresFiltrados.map(conductor => this.mapearAResponseDto(conductor));
  }

  /**
   * Obtener la lista de conductores (para validaciones)
   */
  obtenerListaConductores(): Conductor[] {
    return this.conductores;
  }

  private mapearAResponseDto(conductor: Conductor): ConductorResponseDto {
    return {
      id: conductor.id,
      nombre: conductor.nombre,
      apellido: conductor.apellido,
      correoElectronico: conductor.correoElectronico,
      telefono: conductor.telefono,
      documentoIdentidad: conductor.documentoIdentidad,
      direccion: conductor.direccion,
      numeroLicencia: conductor.numeroLicencia,
      fechaNacimiento: conductor.fechaNacimiento,
      aniosExperiencia: conductor.aniosExperiencia,
      fechaCreacion: conductor.fechaCreacion,
      fechaActualizacion: conductor.fechaActualizacion,
    };
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConductorDTO } from '../dtos/conductor.dto';

@Injectable()
export class ConductorService {
  private readonly logger = new Logger('ConductorService');
  private readonly restUrl = 'http://localhost:3000/conductores';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Obtiene todos los conductores del REST
   * Transforma los datos antes de devolverlos
   */
  async obtenerTodos(): Promise<ConductorDTO[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<ConductorDTO[]>(this.restUrl),
      );
      
      // Transformar datos
      return response.data.map(conductor => ({
        ...conductor,
        // Agregar lógica de transformación si es necesaria
        apellido: conductor.apellido.toUpperCase(),
        documentoIdentidad: this.enmascararDocumento(conductor.documentoIdentidad),
      }));
    } catch (error) {
      this.logger.error(`Error obteniendo conductores: ${error.message}`);
      return [];
    }
  }

  /**
   * Obtiene un conductor específico
   */
  async obtenerPorId(id: string): Promise<ConductorDTO | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<ConductorDTO>(`${this.restUrl}/${id}`),
      );

      return {
        ...response.data,
        apellido: response.data.apellido.toUpperCase(),
        documentoIdentidad: this.enmascararDocumento(response.data.documentoIdentidad),
      };
    } catch (error) {
      this.logger.error(`Error obteniendo conductor ${id}: ${error.message}`);
      return null;
    }
  }

  /**
   * Obtiene conductores con experiencia mínima (Consulta de Negocio #1)
   */
  async obtenerConductoresConExperiencia(aniosMinimos: number): Promise<ConductorDTO[]> {
    try {
      const conductores = await this.obtenerTodos();
      return conductores.filter(c => c.aniosExperiencia >= aniosMinimos);
    } catch (error) {
      this.logger.error(`Error en filtro de experiencia: ${error.message}`);
      return [];
    }
  }

  /**
   * Enmascarar documento para privacidad
   */
  private enmascararDocumento(documento: string): string {
    if (documento.length <= 4) return documento;
    return `****${documento.slice(-4)}`;
  }
}

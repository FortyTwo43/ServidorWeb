import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CoberturaDTO } from '../dtos/cobertura.dto';

@Injectable()
export class CoberturaService {
  private readonly logger = new Logger('CoberturaService');
  private readonly restUrl = 'http://localhost:3000/coberturas';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Obtiene todas las coberturas del REST
   */
  async obtenerTodas(): Promise<CoberturaDTO[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<CoberturaDTO[]>(this.restUrl),
      );

      // Transformar datos
      return response.data.map(cob => ({
        ...cob,
        tipoCobertura: cob.tipoCobertura.toUpperCase(),
        tipoSeguro: cob.tipoSeguro.toUpperCase(),
      }));
    } catch (error) {
      this.logger.error(`Error obteniendo coberturas: ${error.message}`);
      return [];
    }
  }

  /**
   * Obtiene una cobertura por ID
   */
  async obtenerPorId(id: string): Promise<CoberturaDTO | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<CoberturaDTO>(`${this.restUrl}/${id}`),
      );

      return {
        ...response.data,
        tipoCobertura: response.data.tipoCobertura.toUpperCase(),
        tipoSeguro: response.data.tipoSeguro.toUpperCase(),
      };
    } catch (error) {
      this.logger.error(`Error obteniendo cobertura ${id}: ${error.message}`);
      return null;
    }
  }

  /**
   * Obtiene coberturas activas (Consulta de Negocio)
   */
  async obtenerActivas(): Promise<CoberturaDTO[]> {
    try {
      const coberturas = await this.obtenerTodas();
      return coberturas.filter(c => c.activa);
    } catch (error) {
      this.logger.error(`Error obteniendo coberturas activas: ${error.message}`);
      return [];
    }
  }

  /**
   * Obtiene coberturas por tipo
   */
  async obtenerPorTipo(tipo: string): Promise<CoberturaDTO[]> {
    try {
      const coberturas = await this.obtenerTodas();
      return coberturas.filter(
        c => c.tipoCobertura === tipo.toUpperCase()
      );
    } catch (error) {
      this.logger.error(
        `Error obteniendo coberturas por tipo: ${error.message}`,
      );
      return [];
    }
  }
}

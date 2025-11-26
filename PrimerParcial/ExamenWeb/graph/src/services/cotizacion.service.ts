import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CotizacionDTO } from '../dtos/cotizacion.dto';

@Injectable()
export class CotizacionService {
  private readonly logger = new Logger('CotizacionService');
  private readonly restUrl = 'http://localhost:3000/cotizaciones';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Obtiene todas las cotizaciones del REST
   */
  async obtenerTodas(): Promise<CotizacionDTO[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<CotizacionDTO[]>(this.restUrl),
      );

      // Transformar datos
      return response.data.map(cot => ({
        ...cot,
        estado: cot.estado.toUpperCase(),
      }));
    } catch (error) {
      this.logger.error(`Error obteniendo cotizaciones: ${error.message}`);
      return [];
    }
  }

  /**
   * Obtiene una cotización por ID
   */
  async obtenerPorId(id: string): Promise<CotizacionDTO | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<CotizacionDTO>(`${this.restUrl}/${id}`),
      );

      return {
        ...response.data,
        estado: response.data.estado.toUpperCase(),
      };
    } catch (error) {
      this.logger.error(`Error obteniendo cotización ${id}: ${error.message}`);
      return null;
    }
  }

  /**
   * Obtiene cotizaciones por estado (Consulta de Negocio)
   */
  async obtenerPorEstado(estado: string): Promise<CotizacionDTO[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<CotizacionDTO[]>(
          `${this.restUrl}/estado/${estado.toUpperCase()}`,
        ),
      );

      return response.data.map(cot => ({
        ...cot,
        estado: cot.estado.toUpperCase(),
      }));
    } catch (error) {
      this.logger.error(
        `Error obteniendo cotizaciones por estado: ${error.message}`,
      );
      return [];
    }
  }

  /**
   * Calcula la prima total de todas las cotizaciones aprobadas
   */
  async calcularPrimaTotal(): Promise<number> {
    try {
      const cotizaciones = await this.obtenerTodas();
      return cotizaciones
        .filter(c => c.estado === 'APROBADA')
        .reduce((acc, c) => acc + c.prima, 0);
    } catch (error) {
      this.logger.error(`Error calculando prima total: ${error.message}`);
      return 0;
    }
  }

  /**
   * Obtiene cotizaciones con prima mayor a cierto monto
   */
  async obtenerCotizacionesPorPrima(primaMinima: number): Promise<CotizacionDTO[]> {
    try {
      const cotizaciones = await this.obtenerTodas();
      return cotizaciones.filter(c => c.prima >= primaMinima);
    } catch (error) {
      this.logger.error(`Error filtrando por prima: ${error.message}`);
      return [];
    }
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { VehiculoDTO } from '../dtos/vehiculo.dto';

@Injectable()
export class VehiculoService {
  private readonly logger = new Logger('VehiculoService');
  private readonly restUrl = 'http://localhost:3000/vehiculos';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Obtiene todos los vehículos del REST
   */
  async obtenerTodos(): Promise<VehiculoDTO[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<VehiculoDTO[]>(this.restUrl),
      );

      // Transformar datos
      return response.data.map(vehiculo => ({
        ...vehiculo,
        // Agregar lógica de transformación
        marca: vehiculo.marca.toUpperCase(),
        modelo: vehiculo.modelo.toUpperCase(),
        placa: vehiculo.placa.toUpperCase(),
      }));
    } catch (error) {
      this.logger.error(`Error obteniendo vehículos: ${error.message}`);
      return [];
    }
  }

  /**
   * Obtiene un vehículo por ID
   */
  async obtenerPorId(id: string): Promise<VehiculoDTO | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<VehiculoDTO>(`${this.restUrl}/${id}`),
      );

      return {
        ...response.data,
        marca: response.data.marca.toUpperCase(),
        modelo: response.data.modelo.toUpperCase(),
        placa: response.data.placa.toUpperCase(),
      };
    } catch (error) {
      this.logger.error(`Error obteniendo vehículo ${id}: ${error.message}`);
      return null;
    }
  }

  /**
   * Obtiene vehículos por conductor (Consulta de Negocio #2)
   */
  async obtenerPorConductor(conductorId: string): Promise<VehiculoDTO[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<VehiculoDTO[]>(
          `${this.restUrl}/conductor/${conductorId}`,
        ),
      );

      return response.data.map(vehiculo => ({
        ...vehiculo,
        marca: vehiculo.marca.toUpperCase(),
        modelo: vehiculo.modelo.toUpperCase(),
        placa: vehiculo.placa.toUpperCase(),
      }));
    } catch (error) {
      this.logger.error(
        `Error obteniendo vehículos del conductor ${conductorId}: ${error.message}`,
      );
      return [];
    }
  }

  /**
   * Obtiene vehículos por año de fabricación (Consulta de Negocio #3)
   */
  async obtenerPorAno(anioMinimo: number): Promise<VehiculoDTO[]> {
    try {
      const vehiculos = await this.obtenerTodos();
      return vehiculos.filter(v => v.anioFabricacion >= anioMinimo);
    } catch (error) {
      this.logger.error(`Error en filtro de año: ${error.message}`);
      return [];
    }
  }

  /**
   * Calcula el valor promedio de los vehículos
   */
  async calcularValorPromedio(): Promise<number> {
    try {
      const vehiculos = await this.obtenerTodos();
      if (vehiculos.length === 0) return 0;

      const suma = vehiculos.reduce((acc, v) => acc + v.valorComercial, 0);
      return Math.round(suma / vehiculos.length);
    } catch (error) {
      this.logger.error(`Error calculando promedio: ${error.message}`);
      return 0;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { TipoVehiculo } from '../enums';

@Injectable()
export class VehiculoService {
  /**
   * Calcula el valor comercial estimado de un vehículo
   * basado en su marca, modelo, año y tipo
   */
  async calcularValorComercialEstimado(marca: string, modelo: string, anio: number, tipo: TipoVehiculo): Promise<number> {
    // Lógica básica para calcular valor comercial estimado
    let valorBase = 10000000; // $10M COP base

    // Ajustar por tipo de vehículo
    switch (tipo) {
      case TipoVehiculo.MOTO:
        valorBase = 5000000;
        break;
      case TipoVehiculo.CAMION:
        valorBase = 50000000;
        break;
      case TipoVehiculo.TAXI:
        valorBase = 15000000;
        break;
      case TipoVehiculo.CAMIONETA:
        valorBase = 25000000;
        break;
    }

    // Depreciación por año (5% anual)
    const aniosDepreciacion = new Date().getFullYear() - anio;
    const factorDepreciacion = Math.pow(0.95, aniosDepreciacion);
    
    return Math.round(valorBase * factorDepreciacion);
  }

  /**
   * Valida que la placa sea única
   */
  validarPlacaUnica(placa: string, vehiculosExistentes: any[]): boolean {
    if (!placa) return true;
    return !vehiculosExistentes.some(v => v.placa === placa);
  }

  /**
   * Valida que el VIN sea único
   */
  validarVinUnico(vin: string, vehiculosExistentes: any[]): boolean {
    if (!vin) return true;
    return !vehiculosExistentes.some(v => v.vin === vin);
  }
}
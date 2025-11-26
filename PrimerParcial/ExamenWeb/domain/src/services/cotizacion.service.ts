import { Injectable } from '@nestjs/common';
import { TipoVehiculo } from '../enums';

@Injectable()
export class CotizacionService {
  /**
   * Calcula la cotización automática basada en:
   * - Prima de la cobertura
   * - Tipo de vehículo (descuentos/recargos)
   * - Experiencia del conductor
   */
  async calcularCotizacionAutomatica(
    primaCobertura: number,
    tipoVehiculo: TipoVehiculo,
    aniosExperienciaConductor: number
  ): Promise<number> {
    let primaCalculada = primaCobertura;

    // Aplicar descuentos/recargos por tipo de vehículo
    switch (tipoVehiculo) {
      case TipoVehiculo.TAXI:
        primaCalculada *= 1.3; // 30% de recargo
        break;
      case TipoVehiculo.CAMION:
        primaCalculada *= 1.5; // 50% de recargo
        break;
      case TipoVehiculo.MOTO:
        primaCalculada *= 0.7; // 30% de descuento
        break;
    }

    // Aplicar descuento por experiencia del conductor
    if (aniosExperienciaConductor && aniosExperienciaConductor > 5) {
      primaCalculada *= 0.9; // 10% de descuento por experiencia
    }

    return Math.round(primaCalculada);
  }

  /**
   * Valida que las fechas de cotización sean válidas
   */
  validarFechasCotizacion(fechaInicio: Date, fechaFin: Date, fechaVencimiento?: Date): boolean {
    if (fechaFin <= fechaInicio) {
      return false;
    }

    if (fechaVencimiento && fechaVencimiento < fechaInicio) {
      return false;
    }

    return true;
  }

  /**
   * Verifica si una cotización está vencida
   */
  cotizacionVencida(fechaVencimiento: Date): boolean {
    return fechaVencimiento < new Date();
  }
}
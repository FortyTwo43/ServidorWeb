import { Injectable } from '@nestjs/common';
import { TipoCobertura, TipoSeguro } from '../enums';

@Injectable()
export class CoberturaService {
  /**
   * Calcula la prima sugerida basada en el tipo de cobertura,
   * tipo de seguro y valor del vehículo
   */
  async calcularPrimaSugerida(
    tipoCobertura: TipoCobertura,
    tipoSeguro: TipoSeguro,
    valorVehiculo: number
  ): Promise<number> {
    // Porcentaje base según tipo de cobertura
    let porcentajeBase = 0.05; // 5% por defecto

    switch (tipoCobertura) {
      case TipoCobertura.BASICA:
        porcentajeBase = 0.03; // 3%
        break;
      case TipoCobertura.LIMITADA:
        porcentajeBase = 0.05; // 5%
        break;
      case TipoCobertura.AMPLIA:
        porcentajeBase = 0.08; // 8%
        break;
    }

    // Ajuste según tipo de seguro
    let multiplicador = 1;
    if (tipoSeguro === TipoSeguro.TODO_RIESGO) {
      multiplicador = 1.5; // 50% más para todo riesgo
    }

    const prima = Math.round(valorVehiculo * porcentajeBase * multiplicador);
    return prima;
  }

  /**
   * Valida que una cobertura sea válida
   */
  validarCobertura(cobertura: any): boolean {
    return cobertura &&
           cobertura.tipoCobertura &&
           cobertura.tipoSeguro &&
           cobertura.monto > 0 &&
           cobertura.deducible >= 0;
  }
}
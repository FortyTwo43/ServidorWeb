import { Injectable } from '@nestjs/common';

@Injectable()
export class ConductorService {
  /**
   * Calcula la edad de un conductor basado en su fecha de nacimiento
   */
  async calcularEdad(fechaNacimiento: Date): Promise<number> {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const mesNacimiento = fechaNacimiento.getMonth();
    
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    
    return edad;
  }

  /**
   * Valida si el conductor cumple con la experiencia mínima requerida
   */
  async validarExperienciaMinima(aniosExperiencia: number): Promise<boolean> {
    return aniosExperiencia >= 1; // Mínimo 1 año de experiencia
  }

  /**
   * Valida que el email sea único (la persistencia la maneja REST)
   */
  validarEmailUnico(email: string, conductoresExistentes: any[]): boolean {
    return !conductoresExistentes.some(c => c.correoElectronico === email);
  }

  /**
   * Valida que el número de licencia sea único
   */
  validarLicenciaUnica(numeroLicencia: string, conductoresExistentes: any[]): boolean {
    if (!numeroLicencia) return true;
    return !conductoresExistentes.some(c => c.numeroLicencia === numeroLicencia);
  }

  /**
   * Valida que el documento de identidad sea único
   */
  validarDocumentoUnico(documento: string, conductoresExistentes: any[]): boolean {
    if (!documento) return true;
    return !conductoresExistentes.some(c => c.documentoIdentidad === documento);
  }
}
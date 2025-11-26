import { 
  ConductorService,
  VehiculoService, 
  CoberturaService, 
  CotizacionService 
} from './src/services';
import { TipoVehiculo, TipoCobertura, TipoSeguro } from './src/enums';

/**
 * NOTA IMPORTANTE:
 * Este archivo es solo para DEMOSTRACIÓN.
 * El domain NO maneja persistencia.
 * 
 * Los servicios del domain solo tienen LÓGICA DE NEGOCIO.
 * La persistencia es responsabilidad de REST en su data service.
 * 
 * Ver: rest/src/services/ para la implementación real
 */

export class EjemploUsoLogicaNegocio {
  /**
   * Ejemplo: Cálculo de edad
   */
  static async ejemploCalculoEdad() {
    const conductorService = new ConductorService();
    
    const fecha = new Date('1985-05-15');
    const edad = await conductorService.calcularEdad(fecha);
    
    console.log('✅ Edad calculada:', edad, 'años');
  }

  /**
   * Ejemplo: Validación de experiencia
   */
  static async ejemploValidarExperiencia() {
    const conductorService = new ConductorService();
    
    const esValido = await conductorService.validarExperienciaMinima(15);
    console.log('✅ Experiencia válida (15 años):', esValido); // true
  }

  /**
   * Ejemplo: Validar emails únicos
   */
  static async ejemploValidarEmailUnico() {
    const conductorService = new ConductorService();
    
    // Simular conductores existentes (en REST vienen de persistencia)
    const conductoresExistentes = [
      { id: '1', correoElectronico: 'juan@test.com', nombre: 'Juan' },
      { id: '2', correoElectronico: 'maria@test.com', nombre: 'María' }
    ];
    
    const esUnico1 = conductorService.validarEmailUnico('nuevo@test.com', conductoresExistentes);
    console.log('✅ Email nuevo es único:', esUnico1); // true
    
    const esUnico2 = conductorService.validarEmailUnico('juan@test.com', conductoresExistentes);
    console.log('✅ Email existente es único:', esUnico2); // false
  }

  /**
   * Ejemplo: Calcular valor comercial de vehículo
   */
  static async ejemploValorVehiculo() {
    const vehiculoService = new VehiculoService();
    
    // Toyota Corolla 2020 con 5% depreciación anual
    const valor = await vehiculoService.calcularValorComercialEstimado(
      'Toyota',
      'Corolla',
      2020,
      TipoVehiculo.AUTO
    );
    
    console.log('✅ Valor comercial estimado: $', valor.toLocaleString());
  }

  /**
   * Ejemplo: Calcular prima de cobertura
   */
  static async ejemploCalculoPrima() {
    const coberturaService = new CoberturaService();
    
    // Prima para auto de $45M con cobertura amplia
    const prima = await coberturaService.calcularPrimaSugerida(
      TipoCobertura.AMPLIA,
      TipoSeguro.TODO_RIESGO,
      45000000
    );
    
    console.log('✅ Prima sugerida: $', prima.toLocaleString());
  }

  /**
   * Ejemplo: Calcular cotización automática
   */
  static async ejemploCotizacionAutomatica() {
    const cotizacionService = new CotizacionService();
    
    // Prima base: $1.8M
    // Vehículo: AUTO (sin recargo/descuento)
    // Conductor: 15 años experiencia (10% descuento)
    
    const primaFinal = await cotizacionService.calcularCotizacionAutomatica(
      1800000, // prima base
      TipoVehiculo.AUTO,
      15 // años experiencia
    );
    
    console.log('✅ Prima final con descuentos: $', primaFinal.toLocaleString());
    // Prima: 1,800,000 * 0.9 = 1,620,000
  }

  /**
   * Ejemplo: Validar fechas de cotización
   */
  static async ejemploValidarFechas() {
    const cotizacionService = new CotizacionService();
    
    const inicio = new Date('2024-01-01');
    const fin = new Date('2024-12-31');
    const vencimiento = new Date('2024-01-15');
    
    const esValido = cotizacionService.validarFechasCotizacion(inicio, fin, vencimiento);
    console.log('✅ Fechas válidas:', esValido); // true
  }

  /**
   * Ejemplo: Verificar si cotización está vencida
   */
  static async ejemploCotizacionVencida() {
    const cotizacionService = new CotizacionService();
    
    const fechaVencida = new Date('2020-01-15'); // Pasado
    const fechaVigente = new Date('2025-12-31'); // Futuro
    
    const vencida1 = cotizacionService.cotizacionVencida(fechaVencida);
    const vencida2 = cotizacionService.cotizacionVencida(fechaVigente);
    
    console.log('✅ Cotización vencida (2020):', vencida1); // true
    console.log('✅ Cotización vigente (2025):', vencida2); // false
  }
}

/**
 * FLUJO EN REST:
 * 
 * 1. REST Data Service maneja persistencia (listas en memoria)
 * 2. REST Data Service llama a Domain Service para lógica
 * 3. REST Controller expone endpoints HTTP
 * 
 * Ejemplo:
 * 
 * REST Controller (POST /conductores)
 *     ↓
 * REST Data Service.crearConductor()
 *     ├─ Valida con Domain: validarEmailUnico(email, conductores)
 *     ├─ Valida con Domain: validarLicenciaUnica(numero, conductores)
 *     ├─ Guarda en memoria: this.conductores.push(nuevo)
 *     └─ Retorna DTO
 * 
 * REST Controller (GET /cotizaciones/calcular)
 *     ↓
 * REST Data Service.crearCotizacion()
 *     ├─ Obtiene datos de persistencia
 *     ├─ Llama Domain: calcularCotizacionAutomatica(prima, tipo, experiencia)
 *     ├─ Domain calcula y retorna monto
 *     ├─ Guarda en memoria: this.cotizaciones.push(nueva)
 *     └─ Retorna DTO
 */

export default EjemploUsoLogicaNegocio;
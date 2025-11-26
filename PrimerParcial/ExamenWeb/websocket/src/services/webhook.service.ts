import { Injectable, Logger } from '@nestjs/common';
import { NotificacionesGateway } from '../gateways/notificaciones.gateway';

interface PayloadWebhook {
  id: string;
  tipo: 'conductor' | 'vehiculo' | 'cobertura' | 'cotizacion';
  operacion: 'creado' | 'actualizado' | 'eliminado';
  datos: any;
}

@Injectable()
export class WebhookService {
  private logger: Logger = new Logger('WebhookService');

  constructor(private readonly notificacionesGateway: NotificacionesGateway) {}

  /**
   * Procesa el webhook y emite notificación
   */
  async procesarYEmitir(payload: PayloadWebhook) {
    this.logger.log(`Procesando webhook: ${payload.tipo} - ${payload.operacion}`);

    // Lógica adicional si es necesaria
    const notificacion = {
      id: payload.id,
      tipo: payload.tipo,
      operacion: payload.operacion,
      datos: payload.datos,
      timestamp: new Date(),
    };

    // Emitir a todos los clientes WebSocket
    this.notificacionesGateway.emitirNotificacion(notificacion);

    return {
      success: true,
      message: `Notificación de ${payload.tipo} ${payload.operacion} enviada`,
      notificacion,
    };
  }
}

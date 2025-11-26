import { Controller, Post, Body, Logger } from '@nestjs/common';
import { WebhookService } from '../services/webhook.service';

@Controller('webhook')
export class WebhookController {
  private logger: Logger = new Logger('WebhookController');

  constructor(private readonly webhookService: WebhookService) {}

  /**
   * Recibe notificaciones del REST
   * Aplica lógica adicional y emite a WebSocket
   */
  @Post('notificaciones')
  async procesarNotificacion(
    @Body()
    payload: {
      id: string;
      tipo: 'conductor' | 'vehiculo' | 'cobertura' | 'cotizacion';
      operacion: 'creado' | 'actualizado' | 'eliminado';
      datos: any;
    },
  ) {
    this.logger.log(`Webhook recibido: ${payload.tipo} - ${payload.operacion}`);
    return await this.webhookService.procesarYEmitir(payload);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WebhookService {
  private logger: Logger = new Logger('WebhookService');
  private webhookUrl = 'http://localhost:3001/webhook/notificaciones';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Envía notificación al webhook del WebSocket
   * Se ejecuta después de POST o PUT en cualquier entidad
   */
  async notificar(
    id: string,
    tipo: 'conductor' | 'vehiculo' | 'cobertura' | 'cotizacion',
    operacion: 'creado' | 'actualizado' | 'eliminado' | 'aprobado' | 'rechazado',
    datos: any,
  ): Promise<void> {
    try {
      const payload = {
        id,
        tipo,
        operacion,
        datos,
      };

      await firstValueFrom(this.httpService.post(this.webhookUrl, payload));
      this.logger.debug(`Notificación enviada: ${tipo} - ${operacion}`);
    } catch (error) {
      this.logger.error(
        `Error al enviar notificación al webhook: ${error.message}`,
      );
    }
  }
}

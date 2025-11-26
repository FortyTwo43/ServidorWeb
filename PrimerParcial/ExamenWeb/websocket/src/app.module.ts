import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificacionesGateway } from './gateways/notificaciones.gateway';
import { WebhookController } from './controllers/webhook.controller';
import { WebhookService } from './services/webhook.service';

@Module({
  imports: [],
  controllers: [AppController, WebhookController],
  providers: [AppService, NotificacionesGateway, WebhookService],
})
export class AppModule {}

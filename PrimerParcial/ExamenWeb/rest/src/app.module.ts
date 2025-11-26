import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ConductorController,
  VehiculoController,
  CoberturaController,
  CotizacionController,
} from './controllers';
import {
  ConductorDataService,
  VehiculoDataService,
  CoberturaDataService,
  CotizacionDataService,
  WebhookService,
} from './services';
import { DomainModule } from 'seguros-auto-backend';

@Module({
  imports: [DomainModule, HttpModule],
  controllers: [
    AppController,
    ConductorController,
    VehiculoController,
    CoberturaController,
    CotizacionController,
  ],
  providers: [
    AppService,
    ConductorDataService,
    VehiculoDataService,
    CoberturaDataService,
    CotizacionDataService,
    WebhookService,
  ],
})
export class AppModule {}

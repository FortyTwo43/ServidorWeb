import { Module } from '@nestjs/common';
import { MetricasService } from './metricas.service';
import { MetricasResolver } from './metricas.resolver';
import { ServicioHTTPModule } from '../ServicioHTTP/servicioHTTP.module';
import { EstadisticaArquitectoModule } from './estadistica-arquitecto/estadistica-arquitecto.module';
import { KpisPlataformaModule } from './kpis-plataforma/kpis-plataforma.module';
import { MetricasProyectoModule } from './metricas-proyecto/metricas-proyecto.module';

@Module({
  imports: [ServicioHTTPModule, EstadisticaArquitectoModule, KpisPlataformaModule, MetricasProyectoModule],
  providers: [MetricasResolver, MetricasService],
})
export class MetricasModule {}

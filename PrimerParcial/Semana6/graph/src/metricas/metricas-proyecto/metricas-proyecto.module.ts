import { Module } from '@nestjs/common';
import { MetricasProyectoService } from './metricas-proyecto.service';
import { MetricasProyectoResolver } from './metricas-proyecto.resolver';

@Module({
  providers: [MetricasProyectoResolver, MetricasProyectoService],
})
export class MetricasProyectoModule {}

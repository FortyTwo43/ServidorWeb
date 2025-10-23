import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { MetricasService } from './metricas.service';
import { EstadisticasArquitecto } from './estadistica-arquitecto/entities/estadistica-arquitecto.entity';
import { KPIsPlataforma } from './kpis-plataforma/entities/kpis-plataforma.entity';
import { MetricasProyecto } from './metricas-proyecto/entities/metricas-proyecto.entity';

@Resolver()
export class MetricasResolver {
  constructor(private readonly metricasService: MetricasService) {}

  /**
   * Query 4: Estadísticas de Arquitecto
   * Obtiene estadísticas completas de un arquitecto (proyectos, valoraciones, tipos)
   */
  @Query(() => EstadisticasArquitecto, { 
    nullable: true,
    description: 'Obtiene estadísticas completas de un arquitecto específico'
  })
  async estadisticasArquitecto(
    @Args('arquitectoId', { type: () => ID }) arquitectoId: string
  ): Promise<EstadisticasArquitecto | null> {
    return this.metricasService.estadisticasArquitecto(arquitectoId);
  }

  /**
   * Query 5: KPIs de la Plataforma
   * Obtiene KPIs generales de toda la plataforma
   */
  @Query(() => KPIsPlataforma, {
    description: 'Obtiene KPIs generales de la plataforma (usuarios, proyectos, arquitectos, etc.)'
  })
  async kpisPlataforma(): Promise<KPIsPlataforma> {
    return this.metricasService.kpisPlataforma();
  }

  /**
   * Query 6: Métricas de Proyecto
   * Obtiene métricas calculadas de un proyecto específico
   */
  @Query(() => MetricasProyecto, {
    nullable: true,
    description: 'Obtiene métricas calculadas de un proyecto específico (avances, valoraciones, días)'
  })
  async metricasProyecto(
    @Args('proyectoId', { type: () => ID }) proyectoId: string
  ): Promise<MetricasProyecto | null> {
    return this.metricasService.metricasProyecto(proyectoId);
  }
}

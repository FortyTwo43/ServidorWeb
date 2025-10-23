import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MetricasProyectoService } from './metricas-proyecto.service';
import { MetricasProyecto } from './entities/metricas-proyecto.entity';
import { CreateMetricasProyectoInput } from './dto/create-metricas-proyecto.input';
import { UpdateMetricasProyectoInput } from './dto/update-metricas-proyecto.input';

@Resolver(() => MetricasProyecto)
export class MetricasProyectoResolver {
  constructor(private readonly metricasProyectoService: MetricasProyectoService) {}

  @Mutation(() => MetricasProyecto)
  createMetricasProyecto(@Args('createMetricasProyectoInput') createMetricasProyectoInput: CreateMetricasProyectoInput) {
    return this.metricasProyectoService.create(createMetricasProyectoInput);
  }

  @Query(() => [MetricasProyecto], { name: 'metricasProyecto' })
  findAll() {
    return this.metricasProyectoService.findAll();
  }

  @Query(() => MetricasProyecto, { name: 'metricasProyecto' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.metricasProyectoService.findOne(id);
  }

  @Mutation(() => MetricasProyecto)
  updateMetricasProyecto(@Args('updateMetricasProyectoInput') updateMetricasProyectoInput: UpdateMetricasProyectoInput) {
    return this.metricasProyectoService.update(updateMetricasProyectoInput.id, updateMetricasProyectoInput);
  }

  @Mutation(() => MetricasProyecto)
  removeMetricasProyecto(@Args('id', { type: () => Int }) id: number) {
    return this.metricasProyectoService.remove(id);
  }
}

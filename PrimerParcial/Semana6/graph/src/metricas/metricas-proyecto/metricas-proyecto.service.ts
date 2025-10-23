import { Injectable } from '@nestjs/common';
import { CreateMetricasProyectoInput } from './dto/create-metricas-proyecto.input';
import { UpdateMetricasProyectoInput } from './dto/update-metricas-proyecto.input';

@Injectable()
export class MetricasProyectoService {
  create(createMetricasProyectoInput: CreateMetricasProyectoInput) {
    return 'This action adds a new metricasProyecto';
  }

  findAll() {
    return `This action returns all metricasProyecto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metricasProyecto`;
  }

  update(id: number, updateMetricasProyectoInput: UpdateMetricasProyectoInput) {
    return `This action updates a #${id} metricasProyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} metricasProyecto`;
  }
}

import { CreateMetricasProyectoInput } from './create-metricas-proyecto.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMetricasProyectoInput extends PartialType(CreateMetricasProyectoInput) {
  @Field(() => Int)
  id: number;
}

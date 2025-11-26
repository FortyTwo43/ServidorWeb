import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('Cobertura')
export class CoberturaDTO {
  @Field()
  id: string;

  @Field()
  tipoCobertura: string;

  @Field()
  tipoSeguro: string;

  @Field(() => Int)
  monto: number;

  @Field()
  descripcion: string;

  @Field(() => Int)
  deducible: number;

  @Field()
  condiciones: string;

  @Field()
  activa: boolean;

  @Field()
  fechaCreacion: string;

  @Field()
  fechaActualizacion: string;
}

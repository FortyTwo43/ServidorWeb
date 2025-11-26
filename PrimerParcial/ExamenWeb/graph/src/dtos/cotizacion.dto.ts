import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('Cotizacion')
export class CotizacionDTO {
  @Field()
  id: string;

  @Field(() => Int)
  montoTotal: number;

  @Field(() => Int)
  prima: number;

  @Field()
  estado: string;

  @Field()
  fechaInicio: string;

  @Field()
  fechaFin: string;

  @Field()
  fechaVencimiento: string;

  @Field()
  observaciones: string;

  @Field()
  vehiculoId: string;

  @Field()
  coberturaId: string;

  @Field()
  conductorId: string;

  @Field()
  fechaCreacion: string;

  @Field()
  fechaActualizacion: string;
}

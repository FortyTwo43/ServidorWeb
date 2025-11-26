import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('Vehiculo')
export class VehiculoDTO {
  @Field()
  id: string;

  @Field()
  tipo: string;

  @Field()
  marca: string;

  @Field()
  modelo: string;

  @Field(() => Int)
  anioFabricacion: number;

  @Field()
  placa: string;

  @Field()
  vin: string;

  @Field()
  color: string;

  @Field()
  numeroMotor: string;

  @Field(() => Int)
  valorComercial: number;

  @Field()
  conductorId: string;

  @Field()
  fechaCreacion: string;

  @Field()
  fechaActualizacion: string;
}

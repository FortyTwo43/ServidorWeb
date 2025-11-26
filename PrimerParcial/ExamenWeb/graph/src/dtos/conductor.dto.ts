import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('Conductor')
export class ConductorDTO {
  @Field()
  id: string;

  @Field()
  nombre: string;

  @Field()
  apellido: string;

  @Field()
  correoElectronico: string;

  @Field()
  telefono: string;

  @Field()
  documentoIdentidad: string;

  @Field()
  direccion: string;

  @Field()
  numeroLicencia: string;

  @Field()
  fechaNacimiento: string;

  @Field(() => Int)
  aniosExperiencia: number;

  @Field()
  fechaCreacion: string;

  @Field()
  fechaActualizacion: string;
}

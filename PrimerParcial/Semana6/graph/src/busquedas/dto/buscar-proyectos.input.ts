import { InputType, Field, ID, Float } from '@nestjs/graphql';

@InputType()
export class BuscarProyectosInput {
  @Field(() => ID, { nullable: true })
  clienteId?: number;

  @Field({ nullable: true })
  estado?: string;

}

import { InputType, Field, ID} from '@nestjs/graphql';

@InputType()
export class BuscarConversacionesInput {
  @Field(() => ID)
  usuarioId: string;

  @Field(() => ID)
  arquitectoId: string;

  @Field()
  despuesDe: string;
}

import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ConductorDTO } from '../dtos/conductor.dto';
import { ConductorService } from '../services/conductor.service';

@Resolver(() => ConductorDTO)
export class ConductorResolver {
  constructor(private conductorService: ConductorService) {}

  @Query(() => [ConductorDTO], { description: 'Obtiene todos los conductores' })
  async conductores(): Promise<ConductorDTO[]> {
    return this.conductorService.obtenerTodos();
  }

  @Query(() => ConductorDTO, {
    nullable: true,
    description: 'Obtiene un conductor por ID',
  })
  async conductor(@Args('id', { type: () => String }) id: string): Promise<ConductorDTO | null> {
    return this.conductorService.obtenerPorId(id);
  }

  @Query(() => [ConductorDTO], {
    description: 'Obtiene conductores con mínimo de años de experiencia',
  })
  async conductoresConExperiencia(
    @Args('aniosMinimos', { type: () => Int }) aniosMinimos: number,
  ): Promise<ConductorDTO[]> {
    return this.conductorService.obtenerConductoresConExperiencia(aniosMinimos);
  }
}

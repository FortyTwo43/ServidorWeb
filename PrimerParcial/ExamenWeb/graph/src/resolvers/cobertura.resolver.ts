import { Resolver, Query, Args } from '@nestjs/graphql';
import { CoberturaDTO } from '../dtos/cobertura.dto';
import { CoberturaService } from '../services/cobertura.service';

@Resolver(() => CoberturaDTO)
export class CoberturaResolver {
  constructor(private coberturaService: CoberturaService) {}

  @Query(() => [CoberturaDTO], {
    description: 'Obtiene todas las coberturas',
  })
  async coberturas(): Promise<CoberturaDTO[]> {
    return this.coberturaService.obtenerTodas();
  }

  @Query(() => CoberturaDTO, {
    nullable: true,
    description: 'Obtiene una cobertura por ID',
  })
  async cobertura(@Args('id', { type: () => String }) id: string): Promise<CoberturaDTO | null> {
    return this.coberturaService.obtenerPorId(id);
  }

  @Query(() => [CoberturaDTO], {
    description: 'Obtiene coberturas activas',
  })
  async coberturasActivas(): Promise<CoberturaDTO[]> {
    return this.coberturaService.obtenerActivas();
  }

  @Query(() => [CoberturaDTO], {
    description: 'Obtiene coberturas por tipo',
  })
  async cobertuasPorTipo(@Args('tipo', { type: () => String }) tipo: string): Promise<CoberturaDTO[]> {
    return this.coberturaService.obtenerPorTipo(tipo);
  }
}

import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { CotizacionDTO } from '../dtos/cotizacion.dto';
import { CotizacionService } from '../services/cotizacion.service';

@Resolver(() => CotizacionDTO)
export class CotizacionResolver {
  constructor(private cotizacionService: CotizacionService) {}

  @Query(() => [CotizacionDTO], {
    description: 'Obtiene todas las cotizaciones',
  })
  async cotizaciones(): Promise<CotizacionDTO[]> {
    return this.cotizacionService.obtenerTodas();
  }

  @Query(() => CotizacionDTO, {
    nullable: true,
    description: 'Obtiene una cotización por ID',
  })
  async cotizacion(@Args('id', { type: () => String }) id: string): Promise<CotizacionDTO | null> {
    return this.cotizacionService.obtenerPorId(id);
  }

  @Query(() => [CotizacionDTO], {
    description: 'Obtiene cotizaciones por estado',
  })
  async cotizacionesPorEstado(
    @Args('estado', { type: () => String }) estado: string,
  ): Promise<CotizacionDTO[]> {
    return this.cotizacionService.obtenerPorEstado(estado);
  }

  @Query(() => [CotizacionDTO], {
    description: 'Obtiene cotizaciones con prima mínima',
  })
  async cotizacionesPorPrima(
    @Args('primaMinima', { type: () => Int }) primaMinima: number,
  ): Promise<CotizacionDTO[]> {
    return this.cotizacionService.obtenerCotizacionesPorPrima(primaMinima);
  }

  @Query(() => Int, {
    description: 'Calcula la prima total de cotizaciones aprobadas',
  })
  async primaTotal(): Promise<number> {
    return this.cotizacionService.calcularPrimaTotal();
  }
}

import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { VehiculoDTO } from '../dtos/vehiculo.dto';
import { VehiculoService } from '../services/vehiculo.service';

@Resolver(() => VehiculoDTO)
export class VehiculoResolver {
  constructor(private vehiculoService: VehiculoService) {}

  @Query(() => [VehiculoDTO], { description: 'Obtiene todos los vehículos' })
  async vehiculos(): Promise<VehiculoDTO[]> {
    return this.vehiculoService.obtenerTodos();
  }

  @Query(() => VehiculoDTO, {
    nullable: true,
    description: 'Obtiene un vehículo por ID',
  })
  async vehiculo(@Args('id', { type: () => String }) id: string): Promise<VehiculoDTO | null> {
    return this.vehiculoService.obtenerPorId(id);
  }

  @Query(() => [VehiculoDTO], {
    description: 'Obtiene vehículos de un conductor',
  })
  async vehiculosPorConductor(
    @Args('conductorId', { type: () => String }) conductorId: string,
  ): Promise<VehiculoDTO[]> {
    return this.vehiculoService.obtenerPorConductor(conductorId);
  }

  @Query(() => [VehiculoDTO], {
    description: 'Obtiene vehículos por año de fabricación mínimo',
  })
  async vehiculosPorAno(
    @Args('anioMinimo', { type: () => Int }) anioMinimo: number,
  ): Promise<VehiculoDTO[]> {
    return this.vehiculoService.obtenerPorAno(anioMinimo);
  }

  @Query(() => Int, {
    description: 'Calcula el valor comercial promedio de los vehículos',
  })
  async valorPromedioVehiculos(): Promise<number> {
    return this.vehiculoService.calcularValorPromedio();
  }
}

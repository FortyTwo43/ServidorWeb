import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CotizacionDataService } from '../services/cotizacion.service';
import { CreateCotizacionDto, UpdateCotizacionDto, EstadoCotizacion } from 'seguros-auto-backend';

@Controller('cotizaciones')
export class CotizacionController {
  constructor(private readonly cotizacionService: CotizacionDataService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() createCotizacionDto: CreateCotizacionDto) {
    return await this.cotizacionService.crearCotizacion(createCotizacionDto);
  }

  @Get()
  async obtenerTodas() {
    return await this.cotizacionService.obtenerTodas();
  }

  @Get('vehiculo/:vehiculoId')
  async obtenerPorVehiculo(@Param('vehiculoId') vehiculoId: string) {
    return await this.cotizacionService.obtenerPorVehiculo(vehiculoId);
  }

  @Get('conductor/:conductorId')
  async obtenerPorConductor(@Param('conductorId') conductorId: string) {
    return await this.cotizacionService.obtenerPorConductor(conductorId);
  }

  @Get('estado/:estado')
  async obtenerPorEstado(@Param('estado') estado: string) {
    return await this.cotizacionService.obtenerPorEstado(estado as EstadoCotizacion);
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: string) {
    return await this.cotizacionService.obtenerPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() updateCotizacionDto: UpdateCotizacionDto,
  ) {
    return await this.cotizacionService.actualizar(id, updateCotizacionDto);
  }

  @Post(':id/aprobar')
  async aprobar(@Param('id') id: string) {
    return await this.cotizacionService.aprobar(id);
  }

  @Post(':id/rechazar')
  async rechazar(@Param('id') id: string) {
    return await this.cotizacionService.rechazar(id);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return await this.cotizacionService.eliminar(id);
  }
}

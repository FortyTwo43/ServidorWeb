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
import { VehiculoDataService } from '../services/vehiculo.service';
import { CreateVehiculoDto, UpdateVehiculoDto } from 'seguros-auto-backend';

@Controller('vehiculos')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoDataService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() createVehiculoDto: CreateVehiculoDto) {
    return await this.vehiculoService.crearVehiculo(createVehiculoDto);
  }

  @Get()
  async obtenerTodos() {
    return await this.vehiculoService.obtenerTodos();
  }

  @Get('conductor/:conductorId')
  async obtenerPorConductor(@Param('conductorId') conductorId: string) {
    return await this.vehiculoService.obtenerPorConductor(conductorId);
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: string) {
    return await this.vehiculoService.obtenerPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() updateVehiculoDto: UpdateVehiculoDto,
  ) {
    return await this.vehiculoService.actualizar(id, updateVehiculoDto);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return await this.vehiculoService.eliminar(id);
  }
}

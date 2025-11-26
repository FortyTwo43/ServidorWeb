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
import { ConductorDataService } from '../services/conductor.service';
import { CreateConductorDto, UpdateConductorDto } from 'seguros-auto-backend';

@Controller('conductores')
export class ConductorController {
  constructor(private readonly conductorService: ConductorDataService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() createConductorDto: CreateConductorDto) {
    return await this.conductorService.crearConductor(createConductorDto);
  }

  @Get()
  async obtenerTodos() {
    return await this.conductorService.obtenerTodos();
  }

  @Get('buscar/:nombre')
  async buscarPorNombre(@Param('nombre') nombre: string) {
    return await this.conductorService.buscarPorNombre(nombre);
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: string) {
    return await this.conductorService.obtenerPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() updateConductorDto: UpdateConductorDto,
  ) {
    return await this.conductorService.actualizar(id, updateConductorDto);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return await this.conductorService.eliminar(id);
  }
}

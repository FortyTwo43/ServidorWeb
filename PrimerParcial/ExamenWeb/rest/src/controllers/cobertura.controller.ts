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
import { CoberturaDataService } from '../services/cobertura.service';
import { CreateCoberturaDto, UpdateCoberturaDto, TipoCobertura } from 'seguros-auto-backend';

@Controller('coberturas')
export class CoberturaController {
  constructor(private readonly coberturaService: CoberturaDataService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() createCoberturaDto: CreateCoberturaDto) {
    return await this.coberturaService.crearCobertura(createCoberturaDto);
  }

  @Get()
  async obtenerTodas() {
    return await this.coberturaService.obtenerTodas();
  }

  @Get('tipo/:tipo')
  async obtenerPorTipo(@Param('tipo') tipo: string) {
    return await this.coberturaService.obtenerPorTipo(tipo as TipoCobertura);
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: string) {
    return await this.coberturaService.obtenerPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() updateCoberturaDto: UpdateCoberturaDto,
  ) {
    return await this.coberturaService.actualizar(id, updateCoberturaDto);
  }

  @Delete(':id')
  async desactivar(@Param('id') id: string) {
    return await this.coberturaService.desactivar(id);
  }
}

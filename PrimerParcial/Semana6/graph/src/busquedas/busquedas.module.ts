import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BusquedaResolver } from './busquedas.resolver';
import { BusquedaService } from './busquedas.service';

@Module({
  imports: [HttpModule],
  providers: [BusquedaResolver, BusquedaService],
})
export class BusquedaModule {}
import { Module } from '@nestjs/common';
import { 
  ConductorService,
  VehiculoService, 
  CoberturaService, 
  CotizacionService 
} from '../services';

@Module({
  providers: [
    ConductorService,
    VehiculoService,
    CoberturaService,
    CotizacionService
  ],
  exports: [
    ConductorService,
    VehiculoService,
    CoberturaService,
    CotizacionService
  ]
})
export class DomainModule {}

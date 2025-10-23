import { Module } from '@nestjs/common';
import { KpisPlataformaService } from './kpis-plataforma.service';
import { KpisPlataformaResolver } from './kpis-plataforma.resolver';

@Module({
  providers: [KpisPlataformaResolver, KpisPlataformaService],
})
export class KpisPlataformaModule {}

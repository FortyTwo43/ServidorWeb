import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConductorService } from './services/conductor.service';
import { VehiculoService } from './services/vehiculo.service';
import { CotizacionService } from './services/cotizacion.service';
import { CoberturaService } from './services/cobertura.service';
import { ConductorResolver } from './resolvers/conductor.resolver';
import { VehiculoResolver } from './resolvers/vehiculo.resolver';
import { CotizacionResolver } from './resolvers/cotizacion.resolver';
import { CoberturaResolver } from './resolvers/cobertura.resolver';

@Module({
  imports: [
    HttpModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      introspection: true,
      sortSchema: true,
      csrfPrevention: false,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConductorService,
    VehiculoService,
    CotizacionService,
    CoberturaService,
    ConductorResolver,
    VehiculoResolver,
    CotizacionResolver,
    CoberturaResolver,
  ],
})
export class AppModule {}

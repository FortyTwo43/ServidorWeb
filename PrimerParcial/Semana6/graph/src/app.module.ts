import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { MetricasModule } from './metricas/metricas.module';
import { DashboardProyectoModule } from './agregaciones/dashboard-proyecto/dashboard-proyecto.module';
import { BusquedaModule } from './busquedas/busquedas.module';
import { PerfilCompletoArquitectoModule } from './agregaciones/perfil-completo-arquitecto/perfil-completo-arquitecto.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    playground: false, // Apollo Playground
    plugins: [ApolloServerPluginLandingPageLocalDefault()], // Nueva interfaz de Playground
    }),
    HttpModule.register({
    baseURL: 'http://localhost:3000', // URL del servicio REST
    timeout: 5000,
    maxRedirects: 5,
    }),
    DashboardProyectoModule,
    MetricasModule,
    PerfilCompletoArquitectoModule,
    BusquedaModule,
    // Aquí se importarán los módulos de resolver
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}



// arquitecto---
// usuario---
// proyetcto---
// cliente  ---
// conversacion ----
// mensaje ---
// avance ----
// valoracion ----
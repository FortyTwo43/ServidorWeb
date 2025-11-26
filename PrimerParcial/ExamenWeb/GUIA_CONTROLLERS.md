# 🚀 Próximos Pasos: Crear REST Controllers

## Estado Actual
✅ Domain services (lógica de negocio)
✅ REST data services (persistencia)
⏳ Falta: Controllers (endpoints HTTP)

---

## Qué Son los Controllers

Un **Controller** en NestJS:
- Maneja peticiones HTTP (GET, POST, PUT, DELETE)
- Inyecta Data Services
- Retorna respuestas HTTP

### Ejemplo Básico

```typescript
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ConductorDataService } from '../services';
import { CreateConductorDto, UpdateConductorDto } from 'seguros-auto-backend';

@Controller('conductores')
export class ConductorController {
  constructor(private readonly conductorDataService: ConductorDataService) {}

  @Post()
  async crear(@Body() dto: CreateConductorDto) {
    return await this.conductorDataService.crearConductor(dto);
  }

  @Get()
  async obtenerTodos() {
    return await this.conductorDataService.obtenerTodos();
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: string) {
    return await this.conductorDataService.obtenerPorId(id);
  }

  @Put(':id')
  async actualizar(@Param('id') id: string, @Body() dto: UpdateConductorDto) {
    return await this.conductorDataService.actualizar(id, dto);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return await this.conductorDataService.eliminar(id);
  }

  @Get('buscar/:nombre')
  async buscarPorNombre(@Param('nombre') nombre: string) {
    return await this.conductorDataService.buscarPorNombre(nombre);
  }
}
```

---

## Controllers a Crear

### 1. ConductorController
- `POST /conductores` → crear
- `GET /conductores` → obtener todos
- `GET /conductores/:id` → obtener uno
- `PUT /conductores/:id` → actualizar
- `DELETE /conductores/:id` → eliminar
- `GET /conductores/buscar/:nombre` → buscar

### 2. VehiculoController
- `POST /vehiculos` → crear
- `GET /vehiculos` → obtener todos
- `GET /vehiculos/:id` → obtener uno
- `GET /vehiculos/conductor/:conductorId` → por conductor
- `PUT /vehiculos/:id` → actualizar
- `DELETE /vehiculos/:id` → eliminar

### 3. CoberturaController
- `POST /coberturas` → crear
- `GET /coberturas` → obtener todas
- `GET /coberturas/:id` → obtener una
- `GET /coberturas/tipo/:tipo` → por tipo
- `PUT /coberturas/:id` → actualizar
- `DELETE /coberturas/:id` → desactivar

### 4. CotizacionController
- `POST /cotizaciones` → crear
- `GET /cotizaciones` → obtener todas
- `GET /cotizaciones/:id` → obtener una
- `GET /cotizaciones/vehiculo/:vehiculoId` → por vehículo
- `GET /cotizaciones/conductor/:conductorId` → por conductor
- `PUT /cotizaciones/:id` → actualizar
- `POST /cotizaciones/:id/aprobar` → aprobar
- `POST /cotizaciones/:id/rechazar` → rechazar
- `DELETE /cotizaciones/:id` → eliminar

---

## Estructura de Carpetas (Después)

```
rest/src/
├── controllers/
│   ├── conductor.controller.ts
│   ├── vehiculo.controller.ts
│   ├── cobertura.controller.ts
│   ├── cotizacion.controller.ts
│   └── index.ts
├── services/
│   ├── conductor.service.ts
│   ├── vehiculo.service.ts
│   ├── cobertura.service.ts
│   ├── cotizacion.service.ts
│   └── index.ts
├── modules/
│   └── (para agrupar features)
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── main.ts
```

---

## Cómo Crear un Controller

### Paso 1: Crear el archivo
Ubicación: `rest/src/controllers/conductor.controller.ts`

### Paso 2: Inyectar dependencias
```typescript
constructor(private readonly conductorDataService: ConductorDataService) {}
```

### Paso 3: Definir rutas
```typescript
@Post()
@Get()
@Get(':id')
@Put(':id')
@Delete(':id')
```

### Paso 4: Llamar al data service
```typescript
return await this.conductorDataService.crearConductor(dto);
```

---

## Actualizar App Module

En `rest/src/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { 
  ConductorController, 
  VehiculoController,
  CoberturaController,
  CotizacionController
} from './controllers';
import {
  ConductorDataService,
  VehiculoDataService,
  CoberturaDataService,
  CotizacionDataService
} from './services';
import { 
  ConductorService, 
  VehiculoService,
  CoberturaService,
  CotizacionService 
} from 'seguros-auto-backend';

@Module({
  imports: [],
  controllers: [
    ConductorController,
    VehiculoController,
    CoberturaController,
    CotizacionController
  ],
  providers: [
    // Domain services
    ConductorService,
    VehiculoService,
    CoberturaService,
    CotizacionService,
    // REST data services
    ConductorDataService,
    VehiculoDataService,
    CoberturaDataService,
    CotizacionDataService
  ],
})
export class AppModule {}
```

---

## Ejemplo Completo: ConductorController

```typescript
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ConductorDataService } from '../services/conductor.service';
import { CreateConductorDto, UpdateConductorDto } from 'seguros-auto-backend';

@Controller('conductores')
export class ConductorController {
  constructor(private readonly conductorDataService: ConductorDataService) {}

  /**
   * POST /conductores
   * Crear nuevo conductor
   */
  @Post()
  async crear(@Body() dto: CreateConductorDto) {
    return await this.conductorDataService.crearConductor(dto);
  }

  /**
   * GET /conductores
   * Obtener todos los conductores
   */
  @Get()
  async obtenerTodos() {
    return await this.conductorDataService.obtenerTodos();
  }

  /**
   * GET /conductores/:id
   * Obtener un conductor por ID
   */
  @Get(':id')
  async obtenerPorId(@Param('id') id: string) {
    return await this.conductorDataService.obtenerPorId(id);
  }

  /**
   * PUT /conductores/:id
   * Actualizar un conductor
   */
  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() dto: UpdateConductorDto
  ) {
    return await this.conductorDataService.actualizar(id, dto);
  }

  /**
   * DELETE /conductores/:id
   * Eliminar un conductor
   */
  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return await this.conductorDataService.eliminar(id);
  }

  /**
   * GET /conductores/buscar/:nombre
   * Buscar conductores por nombre
   */
  @Get('buscar/:nombre')
  async buscarPorNombre(@Param('nombre') nombre: string) {
    return await this.conductorDataService.buscarPorNombre(nombre);
  }
}
```

---

## Testear Controllers (Con Postman/Thunder Client)

### 1. Crear Conductor
```
POST /conductores
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "correoElectronico": "juan@test.com",
  "telefono": "+57300123456",
  "documentoIdentidad": "123456789",
  "numeroLicencia": "LIC123",
  "fechaNacimiento": "1985-05-15",
  "aniosExperiencia": 10,
  "direccion": "Calle 123 #45"
}
```

### 2. Obtener Todos
```
GET /conductores
```

### 3. Obtener Uno
```
GET /conductores/{id}
```

### 4. Actualizar
```
PUT /conductores/{id}
Content-Type: application/json

{
  "aniosExperiencia": 15
}
```

### 5. Eliminar
```
DELETE /conductores/{id}
```

### 6. Buscar por Nombre
```
GET /conductores/buscar/Juan
```

---

## Validaciones HTTP

Para mejorar la API, puedes agregar pipes de validación:

```typescript
import { ValidationPipe } from '@nestjs/common';

@Post()
async crear(
  @Body(new ValidationPipe()) dto: CreateConductorDto
) {
  return await this.conductorDataService.crearConductor(dto);
}
```

---

## Documentación OpenAPI (Swagger)

```bash
npm install @nestjs/swagger swagger-ui-express
```

Luego en `main.ts`:

```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Seguros Auto')
    .setDescription('Backend para sistema de seguros de autos')
    .setVersion('1.0')
    .addTag('conductores')
    .addTag('vehiculos')
    .addTag('coberturas')
    .addTag('cotizaciones')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

Luego accede a: `http://localhost:3000/api`

---

## Checklist para Controllers

- ⏳ Crear `conductor.controller.ts`
- ⏳ Crear `vehiculo.controller.ts`
- ⏳ Crear `cobertura.controller.ts`
- ⏳ Crear `cotizacion.controller.ts`
- ⏳ Crear `controllers/index.ts` con exports
- ⏳ Actualizar `app.module.ts`
- ⏳ Testar endpoints con Postman
- ⏳ Agregar validaciones (ValidationPipe)
- ⏳ Documentar con Swagger

---

## Tiempo Estimado

- Controllers básicos: **30 minutos**
- Validaciones: **15 minutos**
- Documentación Swagger: **15 minutos**
- Pruebas: **20 minutos**

**Total: ~80 minutos**

---

## Siguientes Fases

### Fase 1: Controllers REST ✅ ACTUAL
### Fase 2: GraphQL Resolvers
### Fase 3: WebSocket Gateways
### Fase 4: Autenticación JWT
### Fase 5: Base de Datos (TypeORM)

---

**Listo para comenzar con los controllers?**


# REST Controllers - Sistema de Seguros

## Endpoints Disponibles

### Conductores
- `POST /conductores` - Crear conductor
- `GET /conductores` - Obtener todos
- `GET /conductores/:id` - Obtener por ID
- `GET /conductores/buscar/:nombre` - Buscar por nombre
- `PUT /conductores/:id` - Actualizar
- `DELETE /conductores/:id` - Eliminar

### Vehículos
- `POST /vehiculos` - Crear vehículo
- `GET /vehiculos` - Obtener todos
- `GET /vehiculos/:id` - Obtener por ID
- `GET /vehiculos/conductor/:conductorId` - Por conductor
- `PUT /vehiculos/:id` - Actualizar
- `DELETE /vehiculos/:id` - Eliminar

### Coberturas
- `GET /coberturas` - Obtener todas
- `GET /coberturas/:id` - Obtener por ID
- `GET /coberturas/tipo/:tipo` - Filtrar por tipo
- `POST /coberturas` - Crear
- `PUT /coberturas/:id` - Actualizar
- `DELETE /coberturas/:id` - Desactivar

### Cotizaciones
- `POST /cotizaciones` - Crear cotización
- `GET /cotizaciones` - Obtener todas
- `GET /cotizaciones/:id` - Obtener por ID
- `GET /cotizaciones/vehiculo/:vehiculoId` - Por vehículo
- `GET /cotizaciones/conductor/:conductorId` - Por conductor
- `GET /cotizaciones/estado/:estado` - Por estado
- `PUT /cotizaciones/:id` - Actualizar
- `POST /cotizaciones/:id/aprobar` - Aprobar
- `POST /cotizaciones/:id/rechazar` - Rechazar
- `DELETE /cotizaciones/:id` - Eliminar

## Ejecutar

```bash
npm install --legacy-peer-deps
npm run build
npm start
```

## Arquitectura

- **Controllers**: Manejan HTTP requests
- **Data Services**: Persistencia en memoria + inyectan domain services
- **Domain Services**: Lógica pura del negocio (importados del @domain)


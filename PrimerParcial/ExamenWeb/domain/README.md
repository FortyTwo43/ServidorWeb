# Sistema de Seguros de Autos - Backend

Backend completo para sistema de seguros de autos construido con NestJS, preparado para REST API, GraphQL y WebSockets.

## 🏗️ Arquitectura

El proyecto sigue una arquitectura de dominio limpia con separación clara de responsabilidades:

```
src/
├── domain/                 # Capa de dominio (reutilizable)
│   ├── entities/           # Entidades del negocio
│   ├── dto/               # Data Transfer Objects
│   ├── services/          # Lógica de negocio
│   ├── enums/            # Enumeraciones
│   └── domain.module.ts  # Módulo del dominio
├── app.module.ts         # Módulo principal
└── main.ts              # Punto de entrada
```

## 📋 Entidades del Sistema

### 👤 Conductor (Cliente-Conductor Unificado)
- Datos personales (nombre, apellido, email, teléfono)
- Documento de identidad único
- Dirección de residencia
- Información de conductor (licencia, experiencia, fecha nacimiento)
- Relación directa con vehículos y cotizaciones

### 🚗 Vehículo
- Tipo (auto, moto, camioneta, taxi, camión, otro)
- Información básica (marca, modelo, año)
- Identificadores únicos (placa, VIN, número de motor)
- Valor comercial estimado
- Relación con conductor propietario y cotizaciones

### 🛡️ Cobertura
- Tipo de cobertura (básica, limitada, amplia)
- Tipo de seguro (terceros, todo riesgo)
- Monto de cobertura y deducible
- Condiciones y descripción
- Estado activo/inactivo

### 💰 Cotización
- Monto total y prima
- Estado (pendiente, aprobada, rechazada, vencida)
- Fechas de vigencia y vencimiento
- Relaciones con vehículo, cobertura y conductor

## 🔗 Relaciones del Sistema

```
Conductor 1:N Vehículo  (Un conductor puede tener múltiples vehículos)
Conductor 1:N Cotización (Un conductor puede tener múltiples cotizaciones)
Vehículo 1:N Cotización (Un vehículo puede tener múltiples cotizaciones)
Cobertura 1:N Cotización (Una cobertura puede aplicar a múltiples cotizaciones)
```

**Cambio importante**: Cliente y Conductor ahora son la misma entidad, simplificando el modelo de negocio para seguros donde el cliente es quien conduce.

## 📊 Enums Disponibles

- **TipoVehiculo**: auto, moto, camioneta, taxi, camion, otro
- **TipoCobertura**: amplia, limitada, basica
- **TipoSeguro**: terceros, todo_riesgo
- **EstadoCotizacion**: pendiente, aprobada, rechazada, vencida

## 🧠 Lógica de Negocio Implementada

### ConductorService (Cliente-Conductor Unificado)
- ✅ Validación de email, teléfono, documento y licencia únicos
- ✅ Búsqueda por nombre y apellido
- ✅ Cálculo automático de edad
- ✅ Validación de experiencia mínima
- ✅ CRUD completo con validaciones

### VehiculoService
- ✅ Validación de placa y VIN únicos
- ✅ Cálculo automático de valor comercial estimado
- ✅ Filtrado por tipo de vehículo
- ✅ Agrupación por conductor propietario

### CotizacionService
- ✅ Validación de fechas de vigencia
- ✅ Cálculo automático de cotización
- ✅ Gestión de estados (aprobar, rechazar, vencer)
- ✅ Cotizaciones detalladas con información relacionada
- ✅ Verificación automática de vencimientos
- ✅ Aplicación de descuentos por experiencia
- ✅ Recargos por tipo de vehículo

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js >= 18
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd ExamenWeb

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run start:dev

# Ejecutar en modo producción
npm run build
npm run start:prod
```

### Scripts Disponibles

```bash
npm run build          # Compilar TypeScript
npm run start         # Iniciar aplicación
npm run start:dev     # Modo desarrollo con watch
npm run start:debug   # Modo debug
npm run start:prod    # Modo producción
npm run lint          # Análisis de código
npm run test          # Ejecutar tests
npm run test:watch    # Tests en modo watch
npm run test:cov      # Tests con coverage
```

## 🌐 Endpoints Preparados

El dominio está completamente preparado para implementar:

### REST API
- Controladores para cada entidad
- Validación automática con DTOs
- Manejo de errores HTTP

### GraphQL
- Resolvers para queries y mutations
- Tipos GraphQL automáticos
- Subscriptions para tiempo real

### WebSockets
- Eventos en tiempo real
- Notificaciones de cambios
- Actualizaciones de estado

## 💾 Persistencia

Actualmente utiliza almacenamiento en memoria para desarrollo. El diseño permite fácil integración con:

- **TypeORM**: Para bases de datos relacionales
- **Mongoose**: Para MongoDB
- **Prisma**: Como ORM alternativo

### Configuración de Base de Datos (Preparada)

Las entidades están decoradas con:
- `@Entity()` para TypeORM
- `@Column()` para definición de columnas
- Relaciones `@OneToMany()` y `@ManyToOne()`
- Validaciones con `class-validator`

## 📝 DTOs y Validación

Cada entidad incluye:
- **CreateDto**: Para creación con validaciones completas
- **UpdateDto**: Para actualización con campos opcionales
- **ResponseDto**: Para respuestas del API
- **DetalladoDto**: Para consultas con información relacionada

## 🎯 Casos de Uso Implementados

1. **Gestión de Clientes**
   - Registro de nuevos clientes
   - Validación de unicidad
   - Búsqueda y filtrado

2. **Administración de Vehículos**
   - Registro por cliente
   - Cálculo de valor comercial
   - Validaciones de identificadores

3. **Configuración de Coberturas**
   - Coberturas predeterminadas
   - Cálculo de primas
   - Gestión de estados

4. **Registro de Conductores**
   - Validación de licencias
   - Cálculo de experiencia
   - Vinculación con clientes

5. **Proceso de Cotización**
   - Cálculo automático de precios
   - Aplicación de descuentos/recargos
   - Gestión de ciclo de vida
   - Verificación de vencimientos

## 🔧 Próximos Pasos

Para completar la implementación:

1. **Agregar Controladores REST**
2. **Implementar Resolvers GraphQL** 
3. **Configurar WebSocket Gateways**
4. **Integrar Base de Datos**
5. **Agregar Autenticación/Autorización**
6. **Implementar Tests Unitarios**
7. **Configurar Documentación OpenAPI/Swagger**

## 📚 Tecnologías Utilizadas

- **NestJS**: Framework para Node.js
- **TypeScript**: Lenguaje de programación
- **Class-validator**: Validación de DTOs
- **Class-transformer**: Transformación de objetos
- **UUID**: Generación de identificadores únicos

## 🤝 Contribución

El código está estructurado para fácil extensión:
- Servicios modulares y reutilizables
- DTOs bien definidos
- Separación clara de responsabilidades
- Preparado para múltiples interfaces (REST, GraphQL, WebSocket)

## 📄 Licencia

Proyecto educativo - QuintoSemestre
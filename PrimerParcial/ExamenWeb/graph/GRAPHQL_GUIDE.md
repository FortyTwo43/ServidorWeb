# 🚀 GraphQL API - Seguro Auto

## 📋 Descripción

Proyecto GraphQL que **SOLO consume datos del REST API** (sin acceso directo a base de datos). Implementa transformación de datos y 3+ consultas de negocio. Interfaz con Apollo Sandbox.

---

## ⚙️ Configuración

### Puerto
- **GraphQL Server**: `http://localhost:3002/graphql`
- **Apollo Sandbox**: `http://localhost:3002/graphql`

### Dependencias
- `@nestjs/graphql` - Framework GraphQL
- `@nestjs/apollo` - Driver Apollo
- `@nestjs/axios` - Cliente HTTP para consumir REST
- `apollo-server-express` - Servidor Apollo

---

## 🗂️ Estructura del Proyecto

```
graph/src/
├── dtos/                    # Tipos GraphQL
│   ├── conductor.dto.ts
│   ├── vehiculo.dto.ts
│   ├── cobertura.dto.ts
│   └── cotizacion.dto.ts
├── services/                # Servicios (consumen REST)
│   ├── conductor.service.ts
│   ├── vehiculo.service.ts
│   ├── cobertura.service.ts
│   └── cotizacion.service.ts
├── resolvers/               # Resolvers GraphQL (Solo QUERIES)
│   ├── conductor.resolver.ts
│   ├── vehiculo.resolver.ts
│   ├── cobertura.resolver.ts
│   └── cotizacion.resolver.ts
├── app.module.ts            # Configuración GraphQL + HttpModule
└── main.ts                  # Puerto 3002
```

---

## 🚀 Cómo Ejecutar

### Terminal 1: REST API
```bash
cd rest
npm start
# Escuchar en puerto 3000
```

### Terminal 2: GraphQL API
```bash
cd graph
npm install  # Si no está hecho
npm start
# Escuchar en puerto 3002
# Acceder a: http://localhost:3002/graphql
```

---

## 📊 Consultas Disponibles

### 1️⃣ CONDUCTORES

#### Obtener todos los conductores
```graphql
query {
  conductores {
    id
    nombre
    apellido
    correoElectronico
    aniosExperiencia
    documentoIdentidad
  }
}
```

#### Obtener conductor por ID
```graphql
query {
  conductor(id: "UUID-AQUI") {
    id
    nombre
    apellido
    numeroLicencia
  }
}
```

#### Obtener conductores con mínima experiencia ⭐ (Consulta Negocio #1)
```graphql
query {
  conductoresConExperiencia(aniosMinimos: 5) {
    id
    nombre
    apellido
    aniosExperiencia
  }
}
```

---

### 2️⃣ VEHÍCULOS

#### Obtener todos los vehículos
```graphql
query {
  vehiculos {
    id
    marca
    modelo
    placa
    anioFabricacion
    valorComercial
  }
}
```

#### Obtener vehículo por ID
```graphql
query {
  vehiculo(id: "UUID-AQUI") {
    marca
    modelo
    placa
    vin
  }
}
```

#### Obtener vehículos por conductor ⭐ (Consulta Negocio #2)
```graphql
query {
  vehiculosPorConductor(conductorId: "UUID-CONDUCTOR") {
    id
    marca
    modelo
    placa
    anioFabricacion
  }
}
```

#### Obtener vehículos por año mínimo ⭐ (Consulta Negocio #3)
```graphql
query {
  vehiculosPorAno(anioMinimo: 2020) {
    id
    marca
    modelo
    anioFabricacion
    valorComercial
  }
}
```

#### Calcular valor promedio de vehículos
```graphql
query {
  valorPromedioVehiculos
}
```

---

### 3️⃣ COTIZACIONES

#### Obtener todas las cotizaciones
```graphql
query {
  cotizaciones {
    id
    montoTotal
    prima
    estado
    fechaInicio
    fechaFin
  }
}
```

#### Obtener cotización por ID
```graphql
query {
  cotizacion(id: "UUID-AQUI") {
    id
    montoTotal
    prima
    estado
  }
}
```

#### Obtener cotizaciones por estado ⭐ (Consulta Negocio)
```graphql
query {
  cotizacionesPorEstado(estado: "APROBADA") {
    id
    montoTotal
    prima
    estado
  }
}
```

#### Obtener cotizaciones con prima mínima
```graphql
query {
  cotizacionesPorPrima(primaMinima: 100000) {
    id
    montoTotal
    prima
    estado
  }
}
```

#### Calcular prima total de aprobadas
```graphql
query {
  primaTotal
}
```

---

### 4️⃣ COBERTURAS

#### Obtener todas las coberturas
```graphql
query {
  coberturas {
    id
    tipoCobertura
    tipoSeguro
    monto
    descripcion
    activa
  }
}
```

#### Obtener cobertura por ID
```graphql
query {
  cobertura(id: "UUID-AQUI") {
    tipoCobertura
    monto
    deducible
  }
}
```

#### Obtener coberturas activas ⭐ (Consulta Negocio)
```graphql
query {
  coberturasActivas {
    id
    tipoCobertura
    tipoSeguro
    monto
    activa
  }
}
```

#### Obtener coberturas por tipo
```graphql
query {
  cobertuasPorTipo(tipo: "BASICA") {
    id
    tipoCobertura
    monto
    deducible
  }
}
```

---

## 🧪 Cómo Probar en Apollo Sandbox

### Paso 1: Abrir Apollo Sandbox
1. Inicia el servidor: `npm start` (en carpeta graph)
2. Abre navegador: `http://localhost:3002/graphql`
3. Automáticamente se abre Apollo Sandbox

### Paso 2: Ejecutar Consulta
1. Pega una de las consultas arriba en el editor
2. Click en botón **▶️ Play**
3. Verás el resultado en el panel derecho

### Paso 3: Ver Schema
1. Click en **"Schema"** (derecha)
2. Explora todos los tipos disponibles
3. Ver documentación de cada campo

---

## 🔄 Flujo de Datos

```
Apollo Sandbox
    ↓ (GraphQL Query)
GraphQL Resolver
    ↓
Service (Transforma datos)
    ↓ (HttpService.get)
REST API (3000)
    ↓
Devuelve datos
    ↓ (Transformados)
Apollo Sandbox
    ↓
Resultado JSON
```

---

## 🔧 Transformaciones de Datos

Los servicios GraphQL transforman datos antes de devolverlos:

### ConductorService
- ✅ Apellido en MAYÚSCULAS
- ✅ Documento enmascarado (solo últimos 4 dígitos)

### VehiculoService
- ✅ Marca en MAYÚSCULAS
- ✅ Modelo en MAYÚSCULAS
- ✅ Placa en MAYÚSCULAS
- ✅ Calcula valor promedio

### CotizacionService
- ✅ Estado en MAYÚSCULAS
- ✅ Filtra por estado
- ✅ Calcula prima total

### CoberturaService
- ✅ Tipo en MAYÚSCULAS
- ✅ Filtra activas
- ✅ Filtra por tipo

---

## ✅ Requisitos Cumplidos

| Requisito | ✅ Cumplido | Detalles |
|-----------|-----------|----------|
| GraphQL basado en REST | ✅ | HttpService consume REST |
| Transformación de datos | ✅ | Mayúsculas, enmascaramiento, etc |
| 3+ consultas de negocio | ✅ | 5+ consultas implementadas |
| Solo QUERIES | ✅ | No hay mutations |
| Sin acceso a BD | ✅ | Solo consume REST |
| Apollo Sandbox | ✅ | Interfaz web completa |
| HttpModule/Axios | ✅ | HttpService implementado |
| Datos transformados | ✅ | Servicios aplican lógica |

---

## 🚫 Prohibiciones Implementadas

- ❌ **NO mutations** - Solo queries
- ❌ **NO acceso directo a BD** - Todo via REST
- ❌ **NO HttpService en controladores** - Solo en servicios
- ❌ **NO datos sin transformar** - Todos transforman datos

---

## 📋 Ejemplo Completo: Query Conductor

### Paso 1: Crear un conductor en REST
```bash
curl -X POST http://localhost:3000/conductores \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "correoElectronico": "juan@test.com",
    "documentoIdentidad": "1234567890",
    "numeroLicencia": "ABC123",
    "aniosExperiencia": 8
  }'
```

Respuesta:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nombre": "Juan",
  "apellido": "Pérez",
  ...
}
```

### Paso 2: Query en Apollo
```graphql
query {
  conductoresConExperiencia(aniosMinimos: 5) {
    id
    nombre
    apellido
    aniosExperiencia
  }
}
```

### Paso 3: Resultado Transformado
```json
{
  "data": {
    "conductoresConExperiencia": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "nombre": "Juan",
        "apellido": "PÉREZ",            // ← Transformado a MAYÚSCULAS
        "aniosExperiencia": 8
      }
    ]
  }
}
```

---

## 🔍 Troubleshooting

### "Cannot reach REST on 3000"
- Verifica que REST esté corriendo: `npm start` en carpeta rest

### "Cannot connect to GraphQL"
- Verifica que GraphQL esté en puerto 3002
- Abre: `http://localhost:3002/graphql`

### "Schema is empty"
- Reinicia: `npm start` en carpeta graph
- Limpia dist: `rm -rf dist`

### "Query returns empty array"
- Verifica que haya datos en REST
- Crea datos: Haz POST a REST primero
- Luego hace query en GraphQL

---

## 📊 Schema GraphQL

```graphql
type Query {
  # Conductores
  conductores: [Conductor!]!
  conductor(id: String!): Conductor
  conductoresConExperiencia(aniosMinimos: Int!): [Conductor!]!
  
  # Vehículos
  vehiculos: [Vehiculo!]!
  vehiculo(id: String!): Vehiculo
  vehiculosPorConductor(conductorId: String!): [Vehiculo!]!
  vehiculosPorAno(anioMinimo: Int!): [Vehiculo!]!
  valorPromedioVehiculos: Int!
  
  # Cotizaciones
  cotizaciones: [Cotizacion!]!
  cotizacion(id: String!): Cotizacion
  cotizacionesPorEstado(estado: String!): [Cotizacion!]!
  cotizacionesPorPrima(primaMinima: Int!): [Cotizacion!]!
  primaTotal: Int!
  
  # Coberturas
  coberturas: [Cobertura!]!
  cobertura(id: String!): Cobertura
  coberturasActivas: [Cobertura!]!
  cobertuasPorTipo(tipo: String!): [Cobertura!]!
}

type Conductor {
  id: String!
  nombre: String!
  apellido: String!
  correoElectronico: String!
  aniosExperiencia: Int!
  documentoIdentidad: String!  # Enmascarado
  ...
}

# Similar para Vehiculo, Cotizacion, Cobertura
```

---

## 🎯 Próximos Pasos

1. ✅ Ejecutar en Apollo Sandbox
2. ✅ Hacer varias queries
3. ✅ Verificar transformaciones
4. ✅ Testear con datos reales

---

**GraphQL API Completada** ✨

Basada en REST, con transformación de datos y Apollo Sandbox funcionando.

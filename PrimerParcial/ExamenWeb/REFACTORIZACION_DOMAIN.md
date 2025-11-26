# 🔄 Refactorización del Dominio - Separación de Responsabilidades

## Cambio Principal

El dominio **ya NO maneja persistencia de datos**. Eso lo hace el proyecto `rest` ahora.

### Antes ❌
```typescript
// ConductorService GUARDABA datos en listas
private conductores: Conductor[] = [];

async crearConductor(dto) {
  this.conductores.push(nuevoConductor); // ❌ Persistencia aquí
}
```

### Después ✅
```typescript
// ConductorService SOLO tiene lógica de negocio
async calcularEdad(fechaNacimiento: Date): Promise<number>
async validarExperienciaMinima(aniosExperiencia: number): Promise<boolean>
validarEmailUnico(email: string, conductoresExistentes: any[]): boolean
```

---

## 📋 Servicios del Domain - Solo Lógica de Negocio

### `ConductorService`
- `calcularEdad(fechaNacimiento)` - Calcula edad actual
- `validarExperienciaMinima(años)` - Valida si tiene 1+ año
- `validarEmailUnico(email, conductores)` - Verifica email único (recibe lista)
- `validarLicenciaUnica(numero, conductores)` - Verifica licencia única
- `validarDocumentoUnico(doc, conductores)` - Verifica documento único

### `VehiculoService`
- `calcularValorComercialEstimado(marca, modelo, año, tipo)` - Calcula valor con depreciación
- `validarPlacaUnica(placa, vehiculos)` - Verifica placa única
- `validarVinUnico(vin, vehiculos)` - Verifica VIN único

### `CoberturaService`
- `calcularPrimaSugerida(tipoCobertura, tipoSeguro, valorVehiculo)` - Calcula prima
- `validarCobertura(cobertura)` - Valida estructura de cobertura

### `CotizacionService`
- `calcularCotizacionAutomatica(prima, tipoVehiculo, experiencia)` - Calcula con descuentos/recargos
- `validarFechasCotizacion(inicio, fin, vencimiento)` - Valida fechas
- `cotizacionVencida(fechaVencimiento)` - Verifica si está vencida

---

## 🗄️ Responsabilidad de REST

El proyecto `rest` ahora maneja:

1. **Persistencia**: Listas en memoria (luego base de datos)
2. **CRUD completo**: Crear, leer, actualizar, eliminar
3. **Validaciones de persistencia**: Emails únicos, placas únicas, etc.
4. **Llamadas a servicios del domain**: Para lógica de negocio

---

## 📝 Ejemplo: Crear Conductor

### Flujo en REST (pseudocódigo)
```typescript
// REST Controller/Service

// 1. Recibe DTO del cliente
POST /conductores
{ nombre: "Juan", email: "juan@test.com", ... }

// 2. Valida persistencia usando Domain Service
const domainService = new ConductorService();
if (!domainService.validarEmailUnico(email, this.conductoresEnMemoria)) {
  throw "Email ya existe";
}

// 3. Calcula lógica de negocio si necesita
const edad = await domainService.calcularEdad(fechaNacimiento);

// 4. GUARDA en persistencia (lista en memoria)
const nuevoConductor = {
  id, nombre, email, ... fechaCreacion, fechaActualizacion
};
this.conductoresEnMemoria.push(nuevoConductor);

// 5. Retorna respuesta
return mapearAResponseDto(nuevoConductor);
```

---

## 🎯 Ventajas

✅ **Domain es agnóstico**: No depende de persistencia  
✅ **Reutilizable**: Cualquier framework puede usarlo (REST, GraphQL, WebSocket)  
✅ **Testeable**: Fácil hacer unit tests de lógica sin BD  
✅ **Limpio**: Cada capa tiene responsabilidad clara  

---

## 📂 Estructura Final

```
domain/
├── src/
│   ├── services/          ← SOLO LÓGICA DE NEGOCIO
│   │   ├── conductor.service.ts
│   │   ├── vehiculo.service.ts
│   │   ├── cobertura.service.ts
│   │   └── cotizacion.service.ts
│   ├── entities/          ← Modelos de datos
│   ├── dto/               ← Esquemas de entrada
│   ├── enums/             ← Tipos de datos
│   └── domain/
│       └── domain.module.ts

rest/
├── src/
│   ├── services/          ← PERSISTENCIA + CRUD
│   │   ├── conductor.service.ts
│   │   ├── vehiculo.service.ts
│   │   ├── cobertura.service.ts
│   │   └── cotizacion.service.ts
│   ├── controllers/       ← HTTP Endpoints
│   │   ├── conductor.controller.ts
│   │   ├── vehiculo.controller.ts
│   │   ├── cobertura.controller.ts
│   │   └── cotizacion.controller.ts
│   └── modules/           ← Módulos de características
```

---

## 🚀 Próximo Paso

Crear los servicios en `rest/src/services/` que:
1. Inyecten servicios del domain
2. Manejen listas en memoria para persistencia
3. Exponga mediante controladores REST


# WebSocket Gateway - Notificaciones en Tiempo Real

## Características

- **Gateway WebSocket**: Emite notificaciones globales sin rooms
- **Webhook Intermediario**: POST `/webhook/notificaciones` recibe eventos del REST
- **Desacoplamiento**: REST no se comunica directamente con WebSocket

## Endpoints

### Webhook
```
POST /webhook/notificaciones
```

**Payload:**
```json
{
  "id": "uuid-del-registro",
  "tipo": "conductor|vehiculo|cobertura|cotizacion",
  "operacion": "creado|actualizado|eliminado",
  "datos": { }
}
```

## Eventos WebSocket

El cliente se conecta y escucha: `notificacion`

**Respuesta:**
```json
{
  "id": "uuid",
  "tipo": "conductor",
  "operacion": "creado",
  "datos": { },
  "timestamp": "2025-11-25T18:30:00.000Z"
}
```

## Ejecutar

```bash
npm install --legacy-peer-deps
npm run build
npm start
```

**Puerto:** 3000

## Flujo

```
REST (POST/PUT) → Webhook → WebhookService → NotificacionesGateway → Clientes WebSocket
```

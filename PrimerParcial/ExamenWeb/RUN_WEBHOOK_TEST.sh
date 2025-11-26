#!/bin/bash
# Script para ejecutar pruebas de integración webhook

echo "======================================"
echo "   WEBHOOK INTEGRATION TEST SUITE   "
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 Requisitos:${NC}"
echo "  1. Node.js v16+
  2. npm v8+
  3. Puerto 3000 disponible (REST)
  4. Puerto 3001 disponible (WebSocket)"
echo ""

echo -e "${YELLOW}⏳ PASO 1: Instalar dependencias en REST${NC}"
cd rest
npm install @nestjs/axios
echo -e "${GREEN}✅ Dependencias instaladas${NC}"
echo ""

echo -e "${YELLOW}⏳ PASO 2: Compilar REST${NC}"
npm run build
echo -e "${GREEN}✅ REST compilado${NC}"
echo ""

echo -e "${YELLOW}📝 INSTRUCCIONES DE EJECUCIÓN:${NC}"
echo ""
echo -e "${BLUE}Terminal 1: Iniciar WebSocket (Puerto 3001)${NC}"
echo "  cd websocket"
echo "  npm start"
echo ""
echo -e "${BLUE}Terminal 2: Iniciar REST (Puerto 3000)${NC}"
echo "  cd rest"
echo "  npm start"
echo ""
echo -e "${BLUE}Terminal 3: Cliente Socket.IO (escuchar notificaciones)${NC}"
echo "  cd rest"
echo "  npm install socket.io-client"
echo "  node -e \"const io = require('socket.io-client'); const socket = io('http://localhost:3001'); socket.on('notificacion', (data) => console.log('✅ NOTIFICACIÓN:', JSON.stringify(data, null, 2))); console.log('⏳ Esperando notificaciones...');\"" 
echo ""
echo -e "${BLUE}Terminal 4: Enviar POST al REST${NC}"
echo ""

echo -e "${YELLOW}Opción A: Crear Conductor${NC}"
echo '  curl -X POST http://localhost:3000/conductores \'
echo '    -H "Content-Type: application/json" \'
echo "    -d '{
      \"nombre\": \"Juan\",
      \"apellido\": \"Pérez\",
      \"correoElectronico\": \"juan@example.com\",
      \"telefono\": \"3105551234\",
      \"documentoIdentidad\": \"1234567890\",
      \"direccion\": \"Calle 123 #45\",
      \"numeroLicencia\": \"ABC123DEF\",
      \"fechaNacimiento\": \"1990-01-01\",
      \"aniosExperiencia\": 5
    }'"
echo ""

echo -e "${YELLOW}Opción B: Crear Vehículo${NC}"
echo '  curl -X POST http://localhost:3000/vehiculos \'
echo '    -H "Content-Type: application/json" \'
echo "    -d '{
      \"tipo\": \"automovil\",
      \"marca\": \"Toyota\",
      \"modelo\": \"Corolla\",
      \"anioFabricacion\": 2022,
      \"placa\": \"ABC-123\",
      \"vin\": \"VIN123456789\",
      \"color\": \"Blanco\",
      \"numeroMotor\": \"MOTOR123\",
      \"valorComercial\": 25000000,
      \"conductorId\": \"<ID_conductor>\"
    }'"
echo ""

echo -e "${YELLOW}Opción C: Crear Cotización${NC}"
echo '  curl -X POST http://localhost:3000/cotizaciones \'
echo '    -H "Content-Type: application/json" \'
echo "    -d '{
      \"montoTotal\": 500000,
      \"prima\": 100000,
      \"estado\": \"PENDIENTE\",
      \"fechaInicio\": \"2025-01-01\",
      \"fechaFin\": \"2026-01-01\",
      \"fechaVencimiento\": \"2025-12-01\",
      \"vehiculoId\": \"<ID_vehiculo>\",
      \"coberturaId\": \"<ID_cobertura>\",
      \"conductorId\": \"<ID_conductor>\"
    }'"
echo ""

echo -e "${YELLOW}Opción D: Aprobar Cotización${NC}"
echo '  curl -X PATCH http://localhost:3000/cotizaciones/<ID_cotizacion>/aprobar'
echo ""

echo -e "${YELLOW}Opción E: Rechazar Cotización${NC}"
echo '  curl -X PATCH http://localhost:3000/cotizaciones/<ID_cotizacion>/rechazar'
echo ""

echo -e "${BLUE}🔍 Resultado Esperado${NC}"
echo "  Terminal 3 (Cliente) recibirá:"
echo "  ✅ NOTIFICACIÓN: {"
echo "    \"id\": \"uuid-generado\","
echo "    \"tipo\": \"conductor|vehiculo|cobertura|cotizacion\","
echo "    \"operacion\": \"creado|actualizado|aprobado|rechazado\","
echo "    \"datos\": { ...entidad_completa... },"
echo "    \"timestamp\": \"ISO-8601-datetime\""
echo "  }"
echo ""

echo -e "${GREEN}======================================"
echo "   SETUP COMPLETADO EXITOSAMENTE     "
echo "======================================${NC}"
echo ""
echo -e "${YELLOW}🚀 Próximo paso: Abre 4 terminales diferentes y sigue las instrucciones arriba${NC}"

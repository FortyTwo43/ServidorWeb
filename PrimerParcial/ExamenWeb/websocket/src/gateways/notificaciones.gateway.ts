import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

/**
 * WebSocket Gateway para notificaciones globales
 * Emite eventos sin rooms
 */
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificacionesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('NotificacionesGateway');

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway inicializado');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  /**
   * Emitir notificación global a todos los clientes
   * @param notificacion Objeto con id, tipo, operacion y datos
   */
  emitirNotificacion(notificacion: {
    id: string;
    tipo: 'conductor' | 'vehiculo' | 'cobertura' | 'cotizacion';
    operacion: 'creado' | 'actualizado' | 'eliminado';
    datos: any;
    timestamp: Date;
  }) {
    this.logger.debug(`Emitiendo notificación: ${notificacion.tipo} - ${notificacion.operacion}`);
    this.server.emit('notificacion', notificacion);
  }
}

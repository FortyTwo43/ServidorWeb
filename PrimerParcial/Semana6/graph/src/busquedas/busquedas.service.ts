import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BusquedaService {
  constructor(private readonly httpService: HttpService) {}

  async buscarArquitectos(filtros: any) {
    try {
      const { nombre, especialidad, experienciaMinima } = filtros;
      const response = await firstValueFrom(this.httpService.get('/arquitectos'));
      let arquitectos = response.data;

      if (nombre) arquitectos = arquitectos.filter(a => a.nombre.toLowerCase().includes(nombre.toLowerCase()));
      if (especialidad) arquitectos = arquitectos.filter(a => a.especialidad === especialidad);

      return arquitectos;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar arquitectos');
    }
  }

  async buscarProyectos(filtros: any) {
    try {
      const { clienteId, estado, presupuestoMin } = filtros;
      const response = await firstValueFrom(this.httpService.get('/proyectos'));
      let proyectos = response.data;

      if (clienteId) proyectos = proyectos.filter(p => p.clienteId === clienteId);
      if (estado) proyectos = proyectos.filter(p => p.estado === estado);
      if (presupuestoMin) proyectos = proyectos.filter(p => p.presupuesto >= presupuestoMin);

      return proyectos;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar proyectos');
    }
  }

  async buscarConversaciones(filtros: any) {
    try {
      const { usuarioId, arquitectoId, despuesDe } = filtros;
      const response = await firstValueFrom(this.httpService.get('/conversaciones'));
      let conversaciones = response.data;

      if (usuarioId) conversaciones = conversaciones.filter(c => c.usuarioId === usuarioId);
      if (arquitectoId) conversaciones = conversaciones.filter(c => c.arquitectoId === arquitectoId);
      if (despuesDe) conversaciones = conversaciones.filter(c => new Date(c.fechaInicio) > new Date(despuesDe));

      return conversaciones;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar conversaciones');
    }
  }
}

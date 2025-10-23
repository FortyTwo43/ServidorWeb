import { Injectable } from '@nestjs/common';
import { RestClientService } from '../ServicioHTTP/servicioHTTP.service';
import { EstadisticasArquitecto, ProyectosPorTipo } from './estadistica-arquitecto/entities/estadistica-arquitecto.entity';
import { KPIsPlataforma, UsuariosPorRol } from './kpis-plataforma/entities/kpis-plataforma.entity';
import { MetricasProyecto } from './metricas-proyecto/entities/metricas-proyecto.entity';

@Injectable()
export class MetricasService {
  constructor(private readonly restClient: RestClientService) {}

  /**
   * Query 4: Estadísticas de Arquitecto
   * Obtiene estadísticas completas de un arquitecto.
   */
  async estadisticasArquitecto(arquitectoId: string): Promise<EstadisticasArquitecto | null> {
    try {
      // Obtener arquitecto
      const arqData = await this.restClient.getArquitecto(arquitectoId);
      const usuarioData = arqData?.usuario || {};
      const nombreCompleto = `${usuarioData.nombre || ''} ${usuarioData.apellido || ''}`.trim();

      // Obtener proyectos
      const proyectosData = await this.restClient.getProyectos({ arquitecto_id: arquitectoId });
      const proyectos = proyectosData.filter((p: any) => String(p.arquitecto_id) === String(arquitectoId));

      // Agrupar por tipo
      const tiposDict: Record<string, number> = {};
      proyectos.forEach((p: any) => {
        const tipo = p.tipo_proyecto || 'Sin especificar';
        tiposDict[tipo] = (tiposDict[tipo] || 0) + 1;
      });

      const proyectosPorTipo: ProyectosPorTipo[] = Object.entries(tiposDict).map(([tipo, cantidad]) => ({
        tipo,
        cantidad,
      }));

      // Obtener todas las valoraciones de estos proyectos
      let totalValoraciones = 0;
      let sumaValoraciones = 0;
      
      for (const p of proyectos) {
        const valData = await this.restClient.getValoraciones({ proyecto_id: String(p.id) });
        const valoraciones = valData.filter((v: any) => String(v.proyecto_id) === String(p.id));
        totalValoraciones += valoraciones.length;
        sumaValoraciones += valoraciones.reduce((sum: number, v: any) => sum + (v.calificacion || 0), 0);
      }

      const valoracionPromedio = totalValoraciones > 0 ? sumaValoraciones / totalValoraciones : 0;

      return {
        arquitecto_id: String(arquitectoId),
        nombre_completo: nombreCompleto,
        total_proyectos: proyectos.length,
        valoracion_promedio: valoracionPromedio,
        proyectos_por_tipo: proyectosPorTipo,
        total_valoraciones: totalValoraciones,
        verificado: arqData?.verificado || false,
      };
    } catch (error) {
      console.error(' Error en estadisticasArquitecto:', error);
      throw error;
    }
  }

  /**
   * Query 5: KPIs de la Plataforma
   * Obtiene KPIs generales de toda la plataforma.
   */
  async kpisPlataforma(): Promise<KPIsPlataforma> {
    try {
      // Obtener todos los usuarios
      const usuariosData = await this.restClient.getUsuarios();
      const totalUsuarios = usuariosData.length;

      // Agrupar por rol
      const rolesDict: Record<string, number> = {};
      usuariosData.forEach((u: any) => {
        const rol = u.rol || 'sin_rol';
        rolesDict[rol] = (rolesDict[rol] || 0) + 1;
      });

      const usuariosPorRol: UsuariosPorRol[] = Object.entries(rolesDict).map(([rol, cantidad]) => ({
        rol,
        cantidad,
      }));

      // Obtener proyectos
      const proyectosData = await this.restClient.getProyectos();
      const totalProyectos = proyectosData.length;

      // Obtener arquitectos
      const arquitectosData = await this.restClient.getArquitectos();
      const totalArquitectos = arquitectosData.length;
      const arquitectosVerificados = arquitectosData.filter((a: any) => a.verificado).length;

      // Obtener clientes
      const clientesData = await this.restClient.getClientes();
      const totalClientes = clientesData.length;

      // Obtener incidencias
      const incidenciasData = await this.restClient.getIncidencias();
      const totalIncidencias = incidenciasData.length;

      return {
        total_usuarios: totalUsuarios,
        usuarios_por_rol: usuariosPorRol,
        total_proyectos: totalProyectos,
        total_arquitectos: totalArquitectos,
        total_clientes: totalClientes,
        total_incidencias: totalIncidencias,
        arquitectos_verificados: arquitectosVerificados,
      };
    } catch (error) {
      console.error(' Error en kpisPlataforma:', error);
      throw error;
    }
  }

  /**
   * Query 6: Métricas de Proyecto
   * Obtiene métricas calculadas de un proyecto específico.
   */
  async metricasProyecto(proyectoId: string): Promise<MetricasProyecto | null> {
    try {
      // Obtener proyecto
      const proyData = await this.restClient.getProyecto(proyectoId);

      // Obtener avances
      const avancesData = await this.restClient.getAvances({ proyecto_id: proyectoId });
      const avances = avancesData.filter((a: any) => String(a.proyecto_id) === String(proyectoId));

      // Obtener valoraciones
      const valData = await this.restClient.getValoraciones({ proyecto_id: proyectoId });
      const valoraciones = valData.filter((v: any) => String(v.proyecto_id) === String(proyectoId));

      // Calcular valoración promedio
      const valoracionPromedio = valoraciones.length > 0
        ? valoraciones.reduce((sum: number, v: any) => sum + (v.calificacion || 0), 0) / valoraciones.length
        : 0;

      // Calcular días transcurridos
      let diasTranscurridos: number | undefined = undefined;
      if (proyData.fecha_publicacion) {
        try {
          const fechaPub = new Date(proyData.fecha_publicacion.split('T')[0]);
          const hoy = new Date();
          diasTranscurridos = Math.floor((hoy.getTime() - fechaPub.getTime()) / (1000 * 60 * 60 * 24));
        } catch {
          // Ignorar error de parseo de fecha
        }
      }

      return {
        proyecto_id: String(proyectoId),
        titulo: proyData.titulo_proyecto || 'Sin título',
        total_avances: avances.length,
        total_valoraciones: valoraciones.length,
        valoracion_promedio: valoracionPromedio,
        dias_transcurridos: diasTranscurridos,
        estado: proyData.tipo_proyecto || 'activo',
      };
    } catch (error) {
      console.error(' Error en metricasProyecto:', error);
      throw error;
    }
  }
}

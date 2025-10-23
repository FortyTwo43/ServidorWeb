import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';

/**
 * Agrupación de proyectos por tipo
 */
@ObjectType()
export class ProyectosPorTipo {
	@Field(() => String, { description: 'Tipo de proyecto' })
	tipo: string;

	@Field(() => Int, { description: 'Cantidad de proyectos de este tipo' })
	cantidad: number;
}

/**
 * Estadísticas completas de un arquitecto
 */
@ObjectType()
export class EstadisticasArquitecto {
	@Field(() => ID, { description: 'ID del arquitecto' })
	arquitecto_id: string;

	@Field(() => String, { description: 'Nombre completo del arquitecto' })
	nombre_completo: string;

	@Field(() => Int, { description: 'Total de proyectos realizados' })
	total_proyectos: number;

	@Field(() => Float, { description: 'Valoración promedio del arquitecto' })
	valoracion_promedio: number;

	@Field(() => [ProyectosPorTipo], { description: 'Distribución de proyectos por tipo' })
	proyectos_por_tipo: ProyectosPorTipo[];

	@Field(() => Int, { description: 'Total de valoraciones recibidas' })
	total_valoraciones: number;

	@Field(() => Boolean, { description: 'Indica si el arquitecto está verificado' })
	verificado: boolean;
}

// Compatibilidad: algunos resolvers usan el nombre singular `EstadisticaArquitecto`
export { EstadisticasArquitecto as EstadisticaArquitecto };

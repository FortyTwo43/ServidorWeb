import { ObjectType, Field, Int } from '@nestjs/graphql';

/**
 * Usuarios agrupados por rol
 */
@ObjectType()
export class UsuariosPorRol {
	@Field(() => String, { description: 'Rol del usuario' })
	rol: string;

	@Field(() => Int, { description: 'Cantidad de usuarios con este rol' })
	cantidad: number;
}

/**
 * KPIs generales de la plataforma
 */
@ObjectType()
export class KPIsPlataforma {
	@Field(() => Int, { description: 'Total de usuarios en la plataforma' })
	total_usuarios: number;

	@Field(() => [UsuariosPorRol], { description: 'Distribución de usuarios por rol' })
	usuarios_por_rol: UsuariosPorRol[];

	@Field(() => Int, { description: 'Total de proyectos en la plataforma' })
	total_proyectos: number;

	@Field(() => Int, { description: 'Total de arquitectos registrados' })
	total_arquitectos: number;

	@Field(() => Int, { description: 'Total de clientes registrados' })
	total_clientes: number;

	@Field(() => Int, { description: 'Total de incidencias reportadas' })
	total_incidencias: number;

	@Field(() => Int, { description: 'Arquitectos con verificación activa' })
	arquitectos_verificados: number;
}

// Compatibilidad: nombre exportado por resolvers
export { KPIsPlataforma as KpisPlataforma };

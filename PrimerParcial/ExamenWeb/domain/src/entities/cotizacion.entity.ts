import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsEnum, IsOptional, IsDateString, IsPositive } from 'class-validator';
import { EstadoCotizacion } from '../enums';
import { Vehiculo } from './vehiculo.entity';
import { Cobertura } from './cobertura.entity';
import { Conductor } from './conductor.entity';

@Entity('cotizaciones')
export class Cotizacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  @IsNumber()
  @IsPositive()
  montoTotal: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  prima?: number;

  @Column({ type: 'enum', enum: EstadoCotizacion, default: EstadoCotizacion.PENDIENTE })
  @IsEnum(EstadoCotizacion)
  estado: EstadoCotizacion;

  @Column({ type: 'date' })
  @IsDateString()
  @IsNotEmpty()
  fechaInicio: Date;

  @Column({ type: 'date' })
  @IsDateString()
  @IsNotEmpty()
  fechaFin: Date;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDateString()
  fechaVencimiento?: Date;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  observaciones?: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  // Relaciones
  @ManyToOne(() => Vehiculo, vehiculo => vehiculo.cotizaciones, { nullable: false })
  @JoinColumn({ name: 'vehiculoId' })
  vehiculo: Vehiculo;

  @Column({ name: 'vehiculoId' })
  vehiculoId: string;

  @ManyToOne(() => Cobertura, cobertura => cobertura.cotizaciones, { nullable: false })
  @JoinColumn({ name: 'coberturaId' })
  cobertura: Cobertura;

  @Column({ name: 'coberturaId' })
  coberturaId: string;

  @ManyToOne(() => Conductor, conductor => conductor.cotizaciones, { nullable: false })
  @JoinColumn({ name: 'conductorId' })
  conductor: Conductor;

  @Column({ name: 'conductorId' })
  conductorId: string;
}
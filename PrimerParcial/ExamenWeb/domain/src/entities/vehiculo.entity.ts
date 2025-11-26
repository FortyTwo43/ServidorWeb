import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional, Min, Max } from 'class-validator';
import { TipoVehiculo } from '../enums';
import { Conductor } from './conductor.entity';
import { Cotizacion } from './cotizacion.entity';

@Entity('vehiculos')
export class Vehiculo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TipoVehiculo })
  @IsEnum(TipoVehiculo)
  @IsNotEmpty()
  tipo: TipoVehiculo;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  marca: string;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  modelo: string;

  @Column({ type: 'int' })
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  anioFabricacion: number;

  @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
  @IsOptional()
  @IsString()
  placa?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  @IsString()
  vin?: string; // Vehicle Identification Number

  @Column({ type: 'varchar', length: 30, nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @IsOptional()
  @IsString()
  numeroMotor?: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  valorComercial?: number;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  // Relaciones
  @ManyToOne(() => Conductor, conductor => conductor.vehiculos, { nullable: false })
  @JoinColumn({ name: 'conductorId' })
  conductor: Conductor;

  @Column({ name: 'conductorId' })
  conductorId: string;

  @OneToMany(() => Cotizacion, cotizacion => cotizacion.vehiculo)
  cotizaciones: Cotizacion[];
}
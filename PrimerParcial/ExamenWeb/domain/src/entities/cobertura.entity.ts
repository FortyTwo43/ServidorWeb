import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsNotEmpty, IsNumber, IsEnum, IsString, IsOptional, IsPositive } from 'class-validator';
import { TipoCobertura, TipoSeguro } from '../enums';
import { Cotizacion } from './cotizacion.entity';

@Entity('coberturas')
export class Cobertura {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TipoCobertura })
  @IsEnum(TipoCobertura)
  @IsNotEmpty()
  tipoCobertura: TipoCobertura;

  @Column({ type: 'enum', enum: TipoSeguro })
  @IsEnum(TipoSeguro)
  @IsNotEmpty()
  tipoSeguro: TipoSeguro;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  @IsNumber()
  @IsPositive()
  monto: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  deducible?: number;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  condiciones?: string;

  @Column({ type: 'boolean', default: true })
  activa: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  // Relaciones
  @OneToMany(() => Cotizacion, cotizacion => cotizacion.cobertura)
  cotizaciones: Cotizacion[];
}
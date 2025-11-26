import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsDateString, IsPhoneNumber } from 'class-validator';
import { Vehiculo } from './vehiculo.entity';
import { Cotizacion } from './cotizacion.entity';

@Entity('conductores')
export class Conductor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  @IsString()
  apellido: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  @IsEmail()
  @IsNotEmpty()
  correoElectronico: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @IsOptional()
  @IsPhoneNumber('CO')
  telefono?: string;

  @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
  @IsOptional()
  @IsString()
  documentoIdentidad?: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  direccion?: string;

  @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
  @IsOptional()
  @IsString()
  numeroLicencia?: string;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDateString()
  fechaNacimiento?: Date;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  aniosExperiencia?: number;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  // Relaciones
  @OneToMany(() => Vehiculo, vehiculo => vehiculo.conductor)
  vehiculos: Vehiculo[];

  @OneToMany(() => Cotizacion, cotizacion => cotizacion.conductor)
  cotizaciones: Cotizacion[];
}
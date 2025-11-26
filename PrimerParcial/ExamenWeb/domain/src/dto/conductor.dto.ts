import { IsEmail, IsNotEmpty, IsString, IsOptional, IsDateString, IsNumber, IsPhoneNumber } from 'class-validator';

export class CreateConductorDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsEmail()
  @IsNotEmpty()
  correoElectronico: string;

  @IsOptional()
  @IsPhoneNumber('CO')
  telefono?: string;

  @IsOptional()
  @IsString()
  documentoIdentidad?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  numeroLicencia?: string;

  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @IsOptional()
  @IsNumber()
  aniosExperiencia?: number;
}

export class UpdateConductorDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsEmail()
  correoElectronico?: string;

  @IsOptional()
  @IsPhoneNumber('CO')
  telefono?: string;

  @IsOptional()
  @IsString()
  documentoIdentidad?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  numeroLicencia?: string;

  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @IsOptional()
  @IsNumber()
  aniosExperiencia?: number;
}

export class ConductorResponseDto {
  id: string;
  nombre: string;
  apellido: string;
  correoElectronico: string;
  telefono?: string;
  documentoIdentidad?: string;
  direccion?: string;
  numeroLicencia?: string;
  fechaNacimiento?: Date;
  aniosExperiencia?: number;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}
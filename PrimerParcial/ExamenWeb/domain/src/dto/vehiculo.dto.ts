import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional, Min, Max } from 'class-validator';
import { TipoVehiculo } from '../enums';

export class CreateVehiculoDto {
  @IsEnum(TipoVehiculo)
  @IsNotEmpty()
  tipo: TipoVehiculo;

  @IsNotEmpty()
  @IsString()
  marca: string;

  @IsNotEmpty()
  @IsString()
  modelo: string;

  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  anioFabricacion: number;

  @IsOptional()
  @IsString()
  placa?: string;

  @IsOptional()
  @IsString()
  vin?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  numeroMotor?: string;

  @IsOptional()
  @IsNumber()
  valorComercial?: number;

  @IsNotEmpty()
  @IsString()
  conductorId: string;
}

export class UpdateVehiculoDto {
  @IsOptional()
  @IsEnum(TipoVehiculo)
  tipo?: TipoVehiculo;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString()
  modelo?: string;

  @IsOptional()
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  anioFabricacion?: number;

  @IsOptional()
  @IsString()
  placa?: string;

  @IsOptional()
  @IsString()
  vin?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  numeroMotor?: string;

  @IsOptional()
  @IsNumber()
  valorComercial?: number;
}

export class VehiculoResponseDto {
  id: string;
  tipo: TipoVehiculo;
  marca: string;
  modelo: string;
  anioFabricacion: number;
  placa?: string;
  vin?: string;
  color?: string;
  numeroMotor?: string;
  valorComercial?: number;
  conductorId: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}
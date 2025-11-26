import { IsNotEmpty, IsNumber, IsEnum, IsString, IsOptional, IsPositive, IsBoolean } from 'class-validator';
import { TipoCobertura, TipoSeguro } from '../enums';

export class CreateCoberturaDto {
  @IsEnum(TipoCobertura)
  @IsNotEmpty()
  tipoCobertura: TipoCobertura;

  @IsEnum(TipoSeguro)
  @IsNotEmpty()
  tipoSeguro: TipoSeguro;

  @IsNumber()
  @IsPositive()
  monto: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  deducible?: number;

  @IsOptional()
  @IsString()
  condiciones?: string;

  @IsOptional()
  @IsBoolean()
  activa?: boolean;
}

export class UpdateCoberturaDto {
  @IsOptional()
  @IsEnum(TipoCobertura)
  tipoCobertura?: TipoCobertura;

  @IsOptional()
  @IsEnum(TipoSeguro)
  tipoSeguro?: TipoSeguro;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  monto?: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  deducible?: number;

  @IsOptional()
  @IsString()
  condiciones?: string;

  @IsOptional()
  @IsBoolean()
  activa?: boolean;
}

export class CoberturaResponseDto {
  id: string;
  tipoCobertura: TipoCobertura;
  tipoSeguro: TipoSeguro;
  monto: number;
  descripcion?: string;
  deducible?: number;
  condiciones?: string;
  activa: boolean;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}
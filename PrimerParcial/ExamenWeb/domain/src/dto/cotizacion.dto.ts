import { IsNotEmpty, IsNumber, IsEnum, IsOptional, IsDateString, IsPositive, IsString } from 'class-validator';
import { EstadoCotizacion } from '../enums';

export class CreateCotizacionDto {
  @IsNumber()
  @IsPositive()
  montoTotal: number;

  @IsOptional()
  @IsNumber()
  prima?: number;

  @IsOptional()
  @IsEnum(EstadoCotizacion)
  estado?: EstadoCotizacion;

  @IsDateString()
  @IsNotEmpty()
  fechaInicio: string;

  @IsDateString()
  @IsNotEmpty()
  fechaFin: string;

  @IsOptional()
  @IsDateString()
  fechaVencimiento?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsNotEmpty()
  @IsString()
  vehiculoId: string;

  @IsNotEmpty()
  @IsString()
  coberturaId: string;

  @IsNotEmpty()
  @IsString()
  conductorId: string;
}

export class UpdateCotizacionDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  montoTotal?: number;

  @IsOptional()
  @IsNumber()
  prima?: number;

  @IsOptional()
  @IsEnum(EstadoCotizacion)
  estado?: EstadoCotizacion;

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @IsOptional()
  @IsDateString()
  fechaVencimiento?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsString()
  vehiculoId?: string;

  @IsOptional()
  @IsString()
  coberturaId?: string;

  @IsOptional()
  @IsString()
  conductorId?: string;
}

export class CotizacionResponseDto {
  id: string;
  montoTotal: number;
  prima?: number;
  estado: EstadoCotizacion;
  fechaInicio: Date;
  fechaFin: Date;
  fechaVencimiento?: Date;
  observaciones?: string;
  vehiculoId: string;
  coberturaId: string;
  conductorId: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

export class CotizacionDetalladaDto extends CotizacionResponseDto {
  vehiculo?: {
    id: string;
    tipo: string;
    marca: string;
    modelo: string;
    anioFabricacion: number;
    placa?: string;
  };
  cobertura?: {
    id: string;
    tipoCobertura: string;
    tipoSeguro: string;
    monto: number;
    descripcion?: string;
  };
  conductor?: {
    id: string;
    nombre: string;
    apellido: string;
    correoElectronico: string;
    numeroLicencia?: string;
  };
}
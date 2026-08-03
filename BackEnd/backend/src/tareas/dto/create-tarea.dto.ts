import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTareaDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsIn(['Pendiente', 'En Proceso', 'Completado'])
  estado: string;

  @IsIn(['Baja', 'Media', 'Alta', 'Urgente'])
  prioridad: string;

  @IsDateString()
  fecha_limite: string;

  @IsInt()
  id_emp: number;
}
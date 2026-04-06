import { IsBoolean, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class NoteDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  @MinLength(1, { message: 'Title must not be empty' })
  title!: string;

  @IsString()
  @MinLength(1, { message: 'Content must not be empty' })
  content!: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  // Solo requerido al crear la nota (se asigna como ADMINISTRADOR)
  @IsOptional()
  @IsInt()
  usuarioId?: number;
}

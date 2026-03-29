import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class RecordatorioDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt()
  @IsNotEmpty()
  note_id: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

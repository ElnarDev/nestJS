import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class NoteShareDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsInt()
  @IsNotEmpty()
  role: number;

  @IsInt()
  @IsNotEmpty()
  usuario_id: number;

  @IsInt()
  @IsNotEmpty()
  note_id: number;
}

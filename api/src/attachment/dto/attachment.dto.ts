import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AttachmentDto {
  @IsInt()
  @IsNotEmpty()
  note_id: number;

  @IsString()
  @IsNotEmpty()
  file_name: string;

  @IsString()
  @IsNotEmpty()
  file_type: string;

  @IsOptional()
  @IsNumber()
  file_size?: number;

  @IsString()
  @IsNotEmpty()
  file_data: string; // base64 encoded
}

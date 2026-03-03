import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Gender } from './enums/gender.enum';

export class PersonDto {
  @IsOptional()
  @IsInt()
  id!: number;

  @IsString()
  @MinLength(4, { message: 'Name must be at least 4 characters long' })
  name!: string;

  @IsInt()
  @Min(1, { message: 'Age must be a positive integer' })
  @Max(120, { message: 'Age must be a realistic value' })
  age!: number;

  @IsEnum(Gender, {
    message: `Gender must be one of the following: ${Object.values(Gender).join(', ')}`,
  })
  gender!: Gender;
}

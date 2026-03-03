import { Transform } from 'class-transformer';
import { IsInt, IsString, Max, Min, MinLength } from 'class-validator';
import { Gender } from './enums/gender.enum';

export class CreatePersonDto {
  @IsString()
  @MinLength(4, { message: 'Name must be at least 4 characters long' })
  @Transform(({ value }) => (value as string).trim())
  name!: string;

  @IsInt()
  @Min(1, { message: 'Age must be a positive integer' })
  @Max(120, { message: 'Age must be a realistic value' })
  age!: number;

  //gender enum if user dont provide it, it will be set to 'other'
  @IsString()
  gender!: Gender;
}

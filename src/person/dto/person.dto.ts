import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class PersonDto {
  @IsOptional()
  @IsInt()
  id!: number;

  @IsString()
  @MinLength(4, { message: 'Name must be at least 4 characters long' })
  name!: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;
}

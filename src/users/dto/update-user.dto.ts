import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  Length,
  IsEmail,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 80, { message: 'Name must be between 3 and 80 characters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @Length(6, 24, { message: 'Password must be between 6 and 24 characters' })
  password: string;

  @IsOptional()
  gender?: string;

  @IsOptional()
  role?: string;
}

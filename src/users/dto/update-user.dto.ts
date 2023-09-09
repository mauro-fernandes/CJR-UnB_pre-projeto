import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  Length,
  IsEmail,
  IsStrongPassword,
  IsStrongPasswordOptions,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 80, { message: 'Name must be between 3 and 80 characters' })
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: `must be between 6 and 24 characters`,
    example: 'P@ssw0rd',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 24, {
    message:
      'Password must be between 6 and 24 characters and contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character',
  })
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    } as IsStrongPasswordOptions,
    {
      message:
        'Password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character',
    },
  )
  password: string;

  @ApiProperty()
  @IsOptional()
  gender?: string;

  @ApiProperty()
  @IsOptional()
  role?: string;
}

import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsOptional()
  id?: number;

  @ApiProperty({
    description: `Task name`,
    example: 'Learn NestJS',
    format: 'string (1-10000 characters)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Text is required' })
  @Length(0, 10000, { message: 'Text is too long' })
  name: string;

  @ApiProperty({
    required: false,
    default: true,
    format: 'boolean',
    example: true,
  })
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    required: false,
    format: 'string',
    example: '1',
  })
  @IsOptional()
  @IsString()
  authorId?: string;
}

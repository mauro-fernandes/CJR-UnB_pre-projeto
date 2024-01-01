import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsNotEmpty, IsBoolean, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: `Task name`,
    example: 'Deep Learn NestJS',
    format: 'string (1-10000 characters)',
  })
  @IsNotEmpty()
  @Length(0, 10000, { message: 'Text is too long' })
  name: string;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

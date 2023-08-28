import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsNotEmpty, IsBoolean, IsOptional, Length } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNotEmpty()
  @Length(0, 10000, { message: 'Text is too long' })
  name: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

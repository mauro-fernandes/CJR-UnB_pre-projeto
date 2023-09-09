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

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Text is required' })
  @Length(0, 10000, { message: 'Text is too long' })
  name: string;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  authorId?: string;
}

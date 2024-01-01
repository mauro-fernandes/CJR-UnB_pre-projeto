import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';
import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @ApiProperty({
    description: `Tag name`,
    example: 'health',
    format: 'string (1-50 characters)',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @Length(1, 50, { message: 'Name must be between 1 and 50 characters' })
  name: string;
}

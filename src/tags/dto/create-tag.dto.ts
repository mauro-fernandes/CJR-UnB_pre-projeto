import { IsString, IsOptional, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    description: `Tag id`,
    example: 1,
    required: false,
    format: 'int32: 4 bytes integer',
  })
  @IsOptional()
  id?: number;

  @ApiProperty({
    description: `Tag name`,
    example: 'health',
    format: 'string (1-50 characters)',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50, { message: 'Name must be between 1 and 50 characters' })
  name: string;
}

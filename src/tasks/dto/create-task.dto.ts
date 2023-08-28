import { IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';

export class CreateTaskDto {
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @Length(0, 10000, { message: 'Text is too long' })
  name: string;

  @IsOptional()
  @IsString()
  authorId?: string;
}

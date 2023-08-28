import { IsString, IsOptional, IsNotEmpty, Length } from 'class-validator';
export class CreateTagDto {
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50, { message: 'Name must be between 1 and 50 characters' })
  name: string;
}

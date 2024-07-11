import { IsNotEmpty, IsString } from 'class-validator';

export class AuthorCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

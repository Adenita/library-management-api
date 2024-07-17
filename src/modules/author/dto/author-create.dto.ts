import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorCreateDto {
  @ApiProperty({
    example: 'Jane Austen',
    description: 'The full name of the author',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

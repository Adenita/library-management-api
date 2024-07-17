import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorShortDto {
  @ApiProperty({
    description: 'The author id',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'Jane Austen',
    description: 'The full name of the author',
  })
  @Expose()
  name: string;
}

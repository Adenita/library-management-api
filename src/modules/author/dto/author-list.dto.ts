import { AuthorShortDto } from './author-short.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorListDto {
  @ApiProperty({
    description: 'List of authors',
  })
  items: AuthorShortDto[];
}

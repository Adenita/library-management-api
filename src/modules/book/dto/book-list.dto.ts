import { BookShortDto } from './book-short.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BookListDto {
  @ApiProperty({
    description: 'List of books',
  })
  items: BookShortDto[];
}

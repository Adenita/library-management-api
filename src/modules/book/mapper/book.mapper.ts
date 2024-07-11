import { Book } from '../entity/book.entity';
import { Mapper } from '../../../shared/mapper';
import { BookShortDto } from '../dto/book-short.dto';
import { BookListDto } from '../dto/book-list.dto';

export class BookMapper {
  static toListTransport(books: Book[]): BookListDto {
    return { items: this.toListDto(books) } as BookListDto;
  }

  private static toListDto(books: Book[]): BookShortDto[] {
    return books.map((book: Book) => Mapper.toDto(BookShortDto, book));
  }
}

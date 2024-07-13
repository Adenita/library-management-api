import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookRepository } from '../repository/book.repository';
import { Book } from '../entity/book.entity';
import { Author } from '../../author/entity/author.entity';

@Injectable()
export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.findAll();
  }

  async findByIdOrThrow(id: string): Promise<Book> {
    const book: Book = await this.bookRepository.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with id: ${id} not found`);
    }
    return book;
  }

  async findByTitleOrThrow(title: string): Promise<Book> {
    const book: Book = await this.bookRepository.findByTitle(title);
    if (!book) {
      throw new NotFoundException(`Book with title: ${title} not found`);
    }
    return book;
  }

  async createOrThrow(book: Book): Promise<Book> {
    const authorIds: string[] = book.authors.map((author: Author) => author.id);
    const booksWithSameTitleAndAuthors: Book[] =
      await this.bookRepository.findBookByTitleAndAuthors(
        book.title,
        authorIds,
      );

    if (booksWithSameTitleAndAuthors.length > 0) {
      throw new ConflictException(
        'A book with this title and the same authors already exists',
      );
    }

    return await this.bookRepository.create(book);
  }

  async updateOrThrow(id: string, book: Book): Promise<void> {
    const updatedBook: Book = await this.bookRepository.findById(book.id);
    if (!updatedBook) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    await this.bookRepository.update(id, book);
  }

  async remove(id: string): Promise<void> {
    return await this.bookRepository.remove(id);
  }
}

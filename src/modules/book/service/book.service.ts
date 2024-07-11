import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookRepository } from '../repository/book.repository';
import { Book } from '../entity/book.entity';

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
    const existingBook: Book = await this.bookRepository.findById(book.id);
    if (existingBook) {
      throw new ConflictException('Book with this email already exists');
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

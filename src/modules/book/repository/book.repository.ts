import { Repository } from 'typeorm';
import { Book } from '../entity/book.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async findById(id: string): Promise<Book> {
    return await this.bookRepository.findOne({ where: { id } });
  }

  async findByTitle(title: string): Promise<Book> {
    return await this.bookRepository.findOne({ where: { title } });
  }

  async create(book: Book): Promise<Book> {
    return await this.bookRepository.save(book);
  }

  async update(id: string, book: Book): Promise<void> {
    await this.bookRepository.update(id, book);
  }

  async remove(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }
}

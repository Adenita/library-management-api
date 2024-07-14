import { Repository } from 'typeorm';
import { Book } from '../entity/book.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../../author/entity/author.entity';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async findAllWithAuthors(): Promise<Book[]> {
    return await this.bookRepository.find({ relations: ['authors'] });
  }

  async findById(id: string): Promise<Book> {
    return await this.bookRepository.findOne({ where: { id } });
  }

  async findByIdWithAuthors(id: string): Promise<Book> {
    return await this.bookRepository.findOne({
      where: { id },
      relations: ['authors'],
    });
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

  async findAuthorBooks(authorId: string): Promise<Book[]> {
    return await this.bookRepository
      .createQueryBuilder('book')
      .innerJoin(
        'book.authors',
        'authorFilter',
        'authorFilter.id = :authorId',
        { authorId },
      )
      .leftJoinAndSelect('book.authors', 'author')
      .getMany();
  }

  async findAllBooksByTitleWithAuthors(title: string): Promise<Book[]> {
    return await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.authors', 'author')
      .where('book.title = :title', { title })
      .getMany();
  }

  async findBookByTitleAndAuthors(
    title: string,
    authorIds: string[],
  ): Promise<Book[]> {
    const allBooksWithTitle: Book[] =
      await this.findAllBooksByTitleWithAuthors(title);

    return allBooksWithTitle.filter((b: Book) => {
      const bookAuthorIds: string[] = b.authors.map(
        (author: Author) => author.id,
      );
      return (
        bookAuthorIds.length === authorIds.length &&
        bookAuthorIds.every((id: string) => authorIds.includes(id))
      );
    });
  }
}

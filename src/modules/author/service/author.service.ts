import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthorRepository } from '../repository/author.repository';
import { Author } from '../entity/author.entity';

@Injectable()
export class AuthorService {
  constructor(private authorRepository: AuthorRepository) {}

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.findAll();
  }

  async findByIdOrThrow(id: string): Promise<Author> {
    const author: Author = await this.authorRepository.findById(id);
    if (!author) {
      throw new NotFoundException(`Author with id: ${id} not found`);
    }
    return author;
  }

  async findByNameOrThrow(name: string): Promise<Author> {
    const author: Author = await this.authorRepository.findById(name);
    if (!author) {
      throw new NotFoundException(`Author with name: ${name} not found`);
    }
    return author;
  }

  async createOrThrow(author: Author): Promise<Author> {
    const existingAuthor: Author = await this.authorRepository.findById(
      author.id,
    );
    if (existingAuthor) {
      throw new ConflictException('Author with this id already exists');
    }

    return await this.authorRepository.create(author);
  }

  async updateOrThrow(id: string, author: Author): Promise<void> {
    const updatedAuthor = await this.authorRepository.findById(id);
    if (!updatedAuthor) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    await this.authorRepository.update(id, author);
  }

  async remove(id: string): Promise<void> {
    return await this.authorRepository.remove(id);
  }
}

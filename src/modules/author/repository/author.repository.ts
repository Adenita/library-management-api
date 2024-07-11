import { Repository } from 'typeorm';
import { Author } from '../entity/author.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  async findById(id: string): Promise<Author> {
    return await this.authorRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Author> {
    return await this.authorRepository.findOne({ where: { name } });
  }

  async create(author: Author): Promise<Author> {
    return await this.authorRepository.save(author);
  }

  async update(id: string, author: Author): Promise<void> {
    await this.authorRepository.update(id, author);
  }

  async remove(id: string): Promise<void> {
    await this.authorRepository.delete(id);
  }
}

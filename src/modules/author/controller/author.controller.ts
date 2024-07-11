import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthorService } from '../service/author.service';
import { AuthorCreateDto } from '../dto/author-create.dto';
import { AuthorUpdateDto } from '../dto/author-update.dto';
import { AuthorListDto } from '../dto/author-list.dto';
import { AuthorShortDto } from '../dto/author-short.dto';
import { AuthorMapper } from '../mapper/author.mapper';
import { Author } from '../entity/author.entity';
import { Mapper } from '../../../shared/mapper';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async findAll(): Promise<AuthorListDto> {
    const authors: Author[] = await this.authorService.findAll();
    return AuthorMapper.toListTransport(authors);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<AuthorShortDto> {
    const author: Author = await this.authorService.findByIdOrThrow(id);
    return Mapper.toDto(AuthorShortDto, author);
  }

  @Post()
  async create(
    @Body() authorCreateDto: AuthorCreateDto,
  ): Promise<AuthorShortDto> {
    const authorToCreate: Author = Mapper.toEntity(Author, authorCreateDto);
    const authorCreated: Author =
      await this.authorService.createOrThrow(authorToCreate);
    return Mapper.toDto(AuthorShortDto, authorCreated);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() authorUpdateDto: AuthorUpdateDto,
  ): Promise<AuthorShortDto> {
    const authorToUpdate: Author = Mapper.toEntity(Author, authorUpdateDto);

    await this.authorService.updateOrThrow(id, authorToUpdate);
    return Mapper.toDto(AuthorShortDto, authorToUpdate);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.authorService.remove(id);
  }
}

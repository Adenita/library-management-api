import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookService } from '../service/book.service';
import { BookCreateDto } from '../dto/book-create.dto';
import { BookUpdateDto } from '../dto/book-update.dto';
import { BookListDto } from '../dto/book-list.dto';
import { BookShortDto } from '../dto/book-short.dto';
import { BookMapper } from '../mapper/book.mapper';
import { Book } from '../entity/book.entity';
import { Mapper } from '../../../shared/mapper';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { Roles } from '../../../auth/roles.guard';
import { RoleType } from '../../user/entity/role.enum';

@Controller('books')
@UseGuards(JwtAuthGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(): Promise<BookListDto> {
    const books: Book[] = await this.bookService.findAllWithAuthors();
    return BookMapper.toListTransport(books);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<BookShortDto> {
    const book: Book = await this.bookService.findByIdWithAuthorsOrThrow(id);
    return Mapper.toDto(BookShortDto, book);
  }

  @Post()
  @Roles([RoleType.ADMIN, RoleType.LIBRARIAN])
  async create(@Body() bookCreateDto: BookCreateDto): Promise<BookShortDto> {
    const bookToCreate: Book = Mapper.toEntity(Book, bookCreateDto);
    const bookCreated: Book =
      await this.bookService.createOrThrow(bookToCreate);
    return Mapper.toDto(BookShortDto, bookCreated);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() bookUpdateDto: BookUpdateDto,
  ): Promise<BookShortDto> {
    const bookToUpdate: Book = Mapper.toEntity(Book, bookUpdateDto);
    await this.bookService.updateOrThrow(id, bookToUpdate);
    return Mapper.toDto(BookShortDto, bookToUpdate);
  }

  @Roles([RoleType.ADMIN, RoleType.LIBRARIAN])
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.bookService.remove(id);
  }
}

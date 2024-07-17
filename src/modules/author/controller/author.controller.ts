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
import { AuthorService } from '../service/author.service';
import { AuthorCreateDto } from '../dto/author-create.dto';
import { AuthorUpdateDto } from '../dto/author-update.dto';
import { AuthorListDto } from '../dto/author-list.dto';
import { AuthorShortDto } from '../dto/author-short.dto';
import { AuthorMapper } from '../mapper/author.mapper';
import { Author } from '../entity/author.entity';
import { Mapper } from '../../../shared/mapper';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { Roles } from '../../../auth/roles.guard';
import { RoleType } from '../../user/entity/role.enum';
import { BookService } from '../../book/service/book.service';
import { BookListDto } from '../../book/dto/book-list.dto';
import { BookMapper } from '../../book/mapper/book.mapper';
import { Book } from '../../book/entity/book.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Author')
@Controller('authors')
@UseGuards(JwtAuthGuard)
export class AuthorController {
  constructor(
    private readonly authorService: AuthorService,
    private readonly bookService: BookService,
  ) {}

  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({
    status: 200,
    description: 'Return all authors.',
    type: AuthorListDto,
  })
  @Get()
  async findAll(): Promise<AuthorListDto> {
    const authors: Author[] = await this.authorService.findAll();
    return AuthorMapper.toListTransport(authors);
  }

  @ApiOperation({ summary: 'Get author by id' })
  @ApiResponse({
    status: 200,
    description: 'Return author by id.',
    type: AuthorShortDto,
  })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<AuthorShortDto> {
    const author: Author = await this.authorService.findByIdOrThrow(id);
    return Mapper.toDto(AuthorShortDto, author);
  }

  @ApiOperation({ summary: 'Create author' })
  @ApiResponse({
    status: 200,
    description: 'Author created successfully.',
    type: AuthorShortDto,
  })
  @Post()
  @Roles([RoleType.ADMIN, RoleType.LIBRARIAN])
  async create(
    @Body() authorCreateDto: AuthorCreateDto,
  ): Promise<AuthorShortDto> {
    const authorToCreate: Author = Mapper.toEntity(Author, authorCreateDto);
    const authorCreated: Author =
      await this.authorService.createOrThrow(authorToCreate);
    return Mapper.toDto(AuthorShortDto, authorCreated);
  }

  @ApiOperation({ summary: 'Update author with given id' })
  @ApiResponse({
    status: 200,
    description: 'Author updated successfully.',
    type: AuthorShortDto,
  })
  @Patch(':id')
  @Roles([RoleType.ADMIN, RoleType.LIBRARIAN])
  async update(
    @Param('id') id: string,
    @Body() authorUpdateDto: AuthorUpdateDto,
  ): Promise<AuthorShortDto> {
    const authorToUpdate: Author = Mapper.toEntity(Author, authorUpdateDto);

    await this.authorService.updateOrThrow(id, authorToUpdate);
    return Mapper.toDto(AuthorShortDto, authorToUpdate);
  }

  @ApiOperation({ summary: 'Delete author by id' })
  @ApiResponse({
    status: 200,
    description: 'Author deleted successfully.',
  })
  @Roles([RoleType.ADMIN, RoleType.LIBRARIAN])
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.authorService.remove(id);
  }

  @ApiOperation({ summary: 'Get all author books' })
  @ApiResponse({
    status: 200,
    description: 'Return all author books',
    type: BookListDto,
  })
  @Get(':id/books')
  async findAuthorBooks(@Param('id') id: string): Promise<BookListDto> {
    const books: Book[] = await this.bookService.findAuthorBooks(id);
    return BookMapper.toListTransport(books);
  }
}

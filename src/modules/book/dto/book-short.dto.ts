import { CategoryType } from '../entity/category.enum';
import { Expose, Type } from 'class-transformer';
import { AuthorShortDto } from '../../author/dto/author-short.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BookShortDto {
  @ApiProperty({
    description: 'The id of the book',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'Little Women',
    description: 'The title of the book',
  })
  @Expose()
  title: string;

  @ApiProperty({
    example: 'English',
    description: 'The language of the book',
  })
  @Expose()
  language: string;

  @ApiProperty({
    example: 'ROMANCE',
    description: 'The category of the book',
  })
  @Expose()
  category: CategoryType;

  @ApiProperty({
    example: '5',
    description: 'The number of copies left in the register',
  })
  @Expose()
  availableCopies: number;

  @ApiProperty({
    example: '[author1, author2]',
    description: 'The books author/authors',
  })
  @Expose()
  @Type(() => AuthorShortDto)
  authors: AuthorShortDto[];
}

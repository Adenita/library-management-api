import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CategoryType } from '../entity/category.enum';
import { AuthorShortDto } from '../../author/dto/author-short.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BookCreateDto {
  @ApiProperty({
    example: 'Little Women',
    description: 'The title of the book',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'English',
    description: 'The language of the book',
  })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({
    example: 'ROMANCE',
    description: 'The category of the book',
  })
  @IsEnum(CategoryType)
  @IsNotEmpty()
  category: CategoryType;

  @ApiProperty({
    example: '5',
    description: 'The number of copies left in the register',
  })
  @IsNumber()
  @IsNotEmpty()
  availableCopies: number;

  @ApiProperty({
    example: '[author1, author2]',
    description: 'The books author/authors',
  })
  @ValidateNested()
  @Type(() => AuthorShortDto)
  authors: AuthorShortDto[];
}

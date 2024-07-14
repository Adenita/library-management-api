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

export class BookCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsEnum(CategoryType)
  @IsNotEmpty()
  category: CategoryType;

  @IsNumber()
  @IsNotEmpty()
  availableCopies: number;

  @ValidateNested()
  @Type(() => AuthorShortDto)
  authors: AuthorShortDto[];
}

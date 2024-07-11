import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
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

  @ValidateNested()
  @Type(() => AuthorShortDto)
  author: AuthorShortDto;
}

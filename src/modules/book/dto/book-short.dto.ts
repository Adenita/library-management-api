import { CategoryType } from '../entity/category.enum';
import { Expose, Type } from 'class-transformer';
import { AuthorShortDto } from '../../author/dto/author-short.dto';

export class BookShortDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  language: string;

  @Expose()
  category: CategoryType;

  @Expose()
  availableCopies: number;

  @Expose()
  @Type(() => AuthorShortDto)
  authors: AuthorShortDto[];
}

import { CategoryType } from '../entity/category.enum';
import { AuthorShortDto } from '../../author/dto/author-short.dto';
import { Expose } from 'class-transformer';

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
  authors: AuthorShortDto[];
}

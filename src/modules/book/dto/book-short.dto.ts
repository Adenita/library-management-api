import { CategoryType } from '../entity/category.enum';
import { AuthorShortDto } from '../../author/dto/author-short.dto';

export class BookShortDto {
  title: string;
  language: string;
  category: CategoryType;
  author: AuthorShortDto;
}

import { CategoryType } from '../entity/category.enum';

export class BookShortDto {
  title: string;
  language: string;
  category: CategoryType;
}

import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CategoryType } from '../entity/category.enum';

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
}

import { BookCreateDto } from './book-create.dto';
import { PartialType } from '@nestjs/swagger';

export class BookUpdateDto extends PartialType(BookCreateDto) {}

import { AuthorCreateDto } from './author-create.dto';
import { PartialType } from '@nestjs/swagger';

export class AuthorUpdateDto extends PartialType(AuthorCreateDto) {}

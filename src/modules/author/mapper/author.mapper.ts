import { Author } from '../entity/author.entity';
import { Mapper } from '../../../shared/mapper';
import { AuthorShortDto } from '../dto/author-short.dto';
import { AuthorListDto } from '../dto/author-list.dto';

export class AuthorMapper {
  static toListTransport(authors: Author[]): AuthorListDto {
    return { items: this.toListDto(authors) } as AuthorListDto;
  }

  private static toListDto(authors: Author[]): AuthorShortDto[] {
    return authors.map((author: Author) =>
      Mapper.toDto(AuthorShortDto, author),
    );
  }
}

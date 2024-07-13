import { Expose } from 'class-transformer';

export class AuthorShortDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}

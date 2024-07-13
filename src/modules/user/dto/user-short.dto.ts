import { Expose } from 'class-transformer';

export class UserShortDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;
}

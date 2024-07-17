import { Expose, Type } from 'class-transformer';
import { UserShortDto } from '../../user/dto/user-short.dto';
import { BookShortDto } from '../../book/dto/book-short.dto';
import { StatusType } from '../entity/status.enum';

export class LoanShortDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => UserShortDto)
  user: UserShortDto;

  @Expose()
  @Type(() => BookShortDto)
  book: BookShortDto;

  @Expose()
  loanDate: Date;

  @Expose()
  returnDate?: Date;

  @Expose()
  dueDate: Date;

  @Expose()
  status: StatusType;
}

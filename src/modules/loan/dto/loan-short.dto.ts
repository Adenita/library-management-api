import { Expose, Type } from 'class-transformer';
import { UserShortDto } from '../../user/dto/user-short.dto';
import { BookShortDto } from '../../book/dto/book-short.dto';
import { StatusType } from '../entity/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class LoanShortDto {
  @ApiProperty({
    description: 'The id of the loan',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'user1',
    description: 'The user who took the loan',
  })
  @Expose()
  @Type(() => UserShortDto)
  user: UserShortDto;

  @ApiProperty({
    example: 'book1',
    description: 'The loaned book',
  })
  @Expose()
  @Type(() => BookShortDto)
  book: BookShortDto;

  @ApiProperty({
    example: '12/02/2023',
    description: 'The date of the loan',
  })
  @Expose()
  loanDate: Date;

  @ApiProperty({
    example: '12/02/2023',
    description: 'The date book was returned',
  })
  @Expose()
  returnDate?: Date;

  @ApiProperty({
    example: '12/02/2023',
    description: 'The date the return is due',
  })
  @Expose()
  dueDate: Date;

  @ApiProperty({
    example: 'ON LOAN',
    description: 'The loan status',
  })
  @Expose()
  status: StatusType;
}

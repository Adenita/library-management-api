import {
  IsNotEmpty,
  IsDate,
  IsEnum,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserShortDto } from '../../user/dto/user-short.dto';
import { BookShortDto } from '../../book/dto/book-short.dto';
import { StatusType } from '../entity/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class LoanCreateDto {
  @ApiProperty({
    example: 'user1',
    description: 'The user who took the loan',
  })
  @ValidateNested()
  @Type(() => UserShortDto)
  @IsNotEmpty()
  user: UserShortDto;

  @ApiProperty({
    example: 'book1',
    description: 'The loaned book',
  })
  @ValidateNested()
  @Type(() => BookShortDto)
  @IsNotEmpty()
  book: BookShortDto;

  @ApiProperty({
    example: '12/02/2023',
    description: 'The date of the loan',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  loanDate: Date;

  @ApiProperty({
    example: '12/02/2023',
    description: 'The date book was returned',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  returnDate?: Date;

  @ApiProperty({
    example: '12/02/2023',
    description: 'The date the return is due',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dueDate: Date;

  @ApiProperty({
    example: 'ON LOAN',
    description: 'The loan status',
  })
  @IsEnum(StatusType)
  @IsNotEmpty()
  status: StatusType;
}

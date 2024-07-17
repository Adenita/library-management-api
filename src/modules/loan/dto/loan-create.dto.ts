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

export class LoanCreateDto {
  @ValidateNested()
  @Type(() => UserShortDto)
  @IsNotEmpty()
  user: UserShortDto;

  @ValidateNested()
  @Type(() => BookShortDto)
  @IsNotEmpty()
  book: BookShortDto;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  loanDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  returnDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dueDate: Date;

  @IsEnum(StatusType)
  @IsNotEmpty()
  status: StatusType;
}

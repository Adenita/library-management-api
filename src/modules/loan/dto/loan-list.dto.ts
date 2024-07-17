import { LoanShortDto } from './loan-short.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoanListDto {
  @ApiProperty({
    description: 'List of loans',
  })
  items: LoanShortDto[];
}

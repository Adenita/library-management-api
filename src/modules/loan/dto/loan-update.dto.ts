import { LoanCreateDto } from './loan-create.dto';
import { PartialType } from '@nestjs/swagger';

export class LoanUpdateDto extends PartialType(LoanCreateDto) {}

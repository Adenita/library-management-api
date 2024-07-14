import { Loan } from '../entity/loan.entity';
import { Mapper } from '../../../shared/mapper';
import { LoanShortDto } from '../dto/loan-short.dto';
import { LoanListDto } from '../dto/loan-list.dto';

export class LoanMapper {
  static toListTransport(loans: Loan[]): LoanListDto {
    return { items: this.toListDto(loans) } as LoanListDto;
  }

  private static toListDto(loans: Loan[]): LoanShortDto[] {
    return loans.map((loan: Loan) => Mapper.toDto(LoanShortDto, loan));
  }
}

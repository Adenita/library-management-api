import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanRepository } from './repository/loan.repository';
import { Loan } from './entity/loan.entity';
import { LoanService } from './service/loan.service';

@Module({
  imports: [TypeOrmModule.forFeature([Loan, LoanRepository])],
  controllers: [],
  providers: [LoanService, LoanRepository],
})
export class LoanModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanRepository } from './repository/loan.repository';
import { Loan } from './entity/loan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loan, LoanRepository])],
  controllers: [],
  providers: [],
})
export class LoanModule {}

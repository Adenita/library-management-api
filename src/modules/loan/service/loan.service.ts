import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoanRepository } from '../repository/loan.repository';
import { Loan } from '../entity/loan.entity';

@Injectable()
export class LoanService {
  constructor(private loanRepository: LoanRepository) {}

  async findAll(): Promise<Loan[]> {
    return await this.loanRepository.findAll();
  }

  async findAllWithDetails(): Promise<Loan[]> {
    return await this.loanRepository.findAllWithDetails();
  }

  async findByIdOrThrow(id: string): Promise<Loan> {
    const loan: Loan = await this.loanRepository.findById(id);
    if (!loan) {
      throw new NotFoundException(`Loan with id: ${id} not found`);
    }
    return loan;
  }

  async findByIdWithDetails(id: string): Promise<Loan> {
    const loan: Loan = await this.loanRepository.findByIdWithDetails(id);
    if (!loan) {
      throw new NotFoundException(`Loan with id: ${id} not found`);
    }
    return loan;
  }

  async createOrThrow(loan: Loan): Promise<Loan> {
    const existingLoan: Loan = await this.loanRepository.findById(loan.id);
    if (existingLoan) {
      throw new ConflictException('Loan with this id already exists');
    }

    return await this.loanRepository.create(loan);
  }

  async updateOrThrow(id: string, loan: Loan): Promise<void> {
    const updatedLoan = await this.findByIdOrThrow(id);
    if (!updatedLoan) {
      throw new NotFoundException(`Loan with id ${id} not found`);
    }
    await this.loanRepository.update(id, loan);
  }

  async remove(id: string): Promise<void> {
    return await this.loanRepository.remove(id);
  }
}

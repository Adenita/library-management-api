import { Repository } from 'typeorm';
import { Loan } from '../entity/loan.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LoanRepository {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
  ) {}

  async findAll(): Promise<Loan[]> {
    return await this.loanRepository.find();
  }

  async findById(id: string): Promise<Loan> {
    return await this.loanRepository.findOne({ where: { id } });
  }

  async create(loan: Loan): Promise<Loan> {
    return await this.loanRepository.save(loan);
  }

  async update(id: string, loan: Loan): Promise<void> {
    await this.loanRepository.update(id, loan);
  }

  async remove(id: string): Promise<void> {
    await this.loanRepository.delete(id);
  }
}

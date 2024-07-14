import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LoanService } from '../service/loan.service';
import { LoanCreateDto } from '../dto/loan-create.dto';
import { LoanUpdateDto } from '../dto/loan-update.dto';
import { LoanListDto } from '../dto/loan-list.dto';
import { LoanShortDto } from '../dto/loan-short.dto';
import { LoanMapper } from '../mapper/loan.mapper';
import { Loan } from '../entity/loan.entity';
import { Mapper } from '../../../shared/mapper';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { Roles } from '../../../auth/roles.guard';
import { RoleType } from '../../user/entity/role.enum';

@Controller('loans')
@UseGuards(JwtAuthGuard)
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get()
  async findAll(): Promise<LoanListDto> {
    const loans: Loan[] = await this.loanService.findAll();
    return LoanMapper.toListTransport(loans);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<LoanShortDto> {
    const loan: Loan = await this.loanService.findByIdOrThrow(id);
    return Mapper.toDto(LoanShortDto, loan);
  }

  @Post()
  @Roles([RoleType.ADMIN])
  async create(@Body() loanCreateDto: LoanCreateDto): Promise<LoanShortDto> {
    const loanToCreate: Loan = Mapper.toEntity(Loan, loanCreateDto);
    const loanCreated: Loan =
      await this.loanService.createOrThrow(loanToCreate);
    return Mapper.toDto(LoanShortDto, loanCreated);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() loanUpdateDto: LoanUpdateDto,
  ): Promise<LoanShortDto> {
    const loanToUpdate: Loan = Mapper.toEntity(Loan, loanUpdateDto);
    await this.loanService.updateOrThrow(id, loanToUpdate);
    return Mapper.toDto(LoanShortDto, loanToUpdate);
  }

  @Roles([RoleType.ADMIN])
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.loanService.remove(id);
  }
}

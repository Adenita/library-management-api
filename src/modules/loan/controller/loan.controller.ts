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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Loan')
@Controller('loans')
@UseGuards(JwtAuthGuard)
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @ApiOperation({ summary: 'Get all loans' })
  @ApiResponse({
    status: 200,
    description: 'Return all loans.',
    type: LoanListDto,
  })
  @Get()
  async findAll(): Promise<LoanListDto> {
    const loans: Loan[] = await this.loanService.findAllWithDetails();
    return LoanMapper.toListTransport(loans);
  }

  @ApiOperation({ summary: 'Get loan by id' })
  @ApiResponse({
    status: 200,
    description: 'Return loan by id.',
    type: LoanShortDto,
  })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<LoanShortDto> {
    const loan: Loan = await this.loanService.findByIdWithDetails(id);
    return Mapper.toDto(LoanShortDto, loan);
  }

  @ApiOperation({ summary: 'Create loan' })
  @ApiResponse({
    status: 200,
    description: 'Loan created successfully.',
    type: LoanShortDto,
  })
  @Post()
  @Roles([RoleType.ADMIN])
  async create(@Body() loanCreateDto: LoanCreateDto): Promise<LoanShortDto> {
    const loanToCreate: Loan = Mapper.toEntity(Loan, loanCreateDto);
    const loanCreated: Loan =
      await this.loanService.createOrThrow(loanToCreate);
    return Mapper.toDto(LoanShortDto, loanCreated);
  }

  @ApiOperation({ summary: 'Update loan with given id' })
  @ApiResponse({
    status: 200,
    description: 'Loan updated successfully.',
    type: LoanShortDto,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() loanUpdateDto: LoanUpdateDto,
  ): Promise<LoanShortDto> {
    const loanToUpdate: Loan = Mapper.toEntity(Loan, loanUpdateDto);
    await this.loanService.updateOrThrow(id, loanToUpdate);
    return Mapper.toDto(LoanShortDto, loanToUpdate);
  }

  @ApiOperation({ summary: 'Delete loan by id' })
  @ApiResponse({
    status: 200,
    description: 'Loan deleted successfully.',
  })
  @Roles([RoleType.ADMIN])
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.loanService.remove(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entity/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async save(refreshToken: RefreshToken): Promise<RefreshToken> {
    return this.refreshTokenRepository.save(refreshToken);
  }

  async findOneByToken(token: string): Promise<RefreshToken | undefined> {
    return this.refreshTokenRepository.findOne({ where: { token } });
  }

  async deleteByToken(token: string): Promise<void> {
    await this.refreshTokenRepository.delete({ token });
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../modules/user/repository/user.repository';
import { RefreshTokenRepository } from '../../modules/user/repository/refresh-token.repository';
import { User } from '../../modules/user/entity/user.entity';
import { RefreshToken } from '../../modules/user/entity/refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async generateAccessToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, { secret: 'accessSecretKey', expiresIn: '15m' });
  }

  async generateRefreshToken(user: User): Promise<string> {
    const refreshToken = this.jwtService.sign({ username: user.username }, { secret: 'refreshSecretKey', expiresIn: '7d' });

    const sevenDaysFromNow: number = (Date.now() + 7 * 24 * 60 * 60 * 1000);
    const expirationDate: Date = new Date(sevenDaysFromNow);

    await this.refreshTokenRepository.save(this.getRefreshToken(refreshToken, user, expirationDate));

    return refreshToken;
  }

  async verifyAccessToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token, { secret: 'accessSecretKey' });
    } catch (e) {
      throw new Error('Access token verification failed');
    }
  }

  async verifyRefreshToken(token: string): Promise<any> {
    const refreshToken = await this.refreshTokenRepository.findOneByToken(token);
    if (!refreshToken) {
      throw new Error('Invalid refresh token');
    }
    try {
      return this.jwtService.verify(token, { secret: 'refreshSecretKey' });
    } catch (e) {
      throw new Error('Refresh token verification failed');
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    const payload = await this.verifyRefreshToken(refreshToken);
    const user = await this.userRepository.findByUsername(payload.username);
    if (!user) {
      throw new Error('User not found');
    }
    return this.generateAccessToken({ username: user.username });
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await this.refreshTokenRepository.deleteByToken(token);
  }

  getRefreshToken(refreshToken: string, user: User, expirationDate: Date): RefreshToken {
    return {
      token: refreshToken,
      user,
      expiresIn: expirationDate
    } as RefreshToken;
  }
}

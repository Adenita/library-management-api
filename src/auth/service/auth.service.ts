import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepository } from '../../modules/user/repository/refresh-token.repository';
import { User } from '../../modules/user/entity/user.entity';
import { RefreshToken } from '../../modules/user/entity/refresh-token.entity';
import { UserService } from '../../modules/user/service/user.service';

@Injectable()
export class AuthService {
  readonly ACCESS_SECRET_KEY: string = 'accessSecretKey';
  readonly REFRESH_SECRET_KEY: string = 'refreshSecretKey';
  readonly ACCESS_KEY_EXPIRATION_TIME: string = '15m';
  readonly REFRESH_KEY_EXPIRATION_TIME: string = '7d';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async generateAccessToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: this.ACCESS_SECRET_KEY,
      expiresIn: this.ACCESS_KEY_EXPIRATION_TIME,
    });
  }

  async generateRefreshToken(user: User): Promise<string> {
    const refreshToken = this.jwtService.sign(
      { username: user.username },
      {
        secret: this.REFRESH_SECRET_KEY,
        expiresIn: this.REFRESH_KEY_EXPIRATION_TIME,
      },
    );

    const sevenDaysFromNow: number = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const expirationDate: Date = new Date(sevenDaysFromNow);

    await this.refreshTokenRepository.save(
      this.getRefreshToken(refreshToken, user, expirationDate),
    );

    return refreshToken;
  }

  async verifyAccessToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token, { secret: this.ACCESS_SECRET_KEY });
    } catch (e) {
      throw new Error('Access token verification failed');
    }
  }

  async verifyRefreshToken(token: string): Promise<any> {
    const refreshToken =
      await this.refreshTokenRepository.findOneByToken(token);
    if (!refreshToken) {
      throw new Error('Invalid refresh token');
    }
    try {
      return this.jwtService.verify(token, { secret: this.REFRESH_SECRET_KEY });
    } catch (e) {
      throw new Error('Refresh token verification failed');
    }
  }

  async refreshAccessTokenOrThrow(refreshToken: string): Promise<string> {
    const payload = await this.verifyRefreshToken(refreshToken);
    const user = await this.userService.findByUsernameOrThrow(payload.username);
    return this.generateAccessToken({ username: user.username });
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await this.refreshTokenRepository.deleteByToken(token);
  }

  getRefreshToken(
    refreshToken: string,
    user: User,
    expirationDate: Date,
  ): RefreshToken {
    return {
      token: refreshToken,
      user,
      expiresIn: expirationDate,
    } as RefreshToken;
  }
}

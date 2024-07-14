import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../modules/user/service/user.service';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';
import { User } from '../../modules/user/entity/user.entity';
import { RefreshToken } from '../entity/refresh-token.entity';

export type Key = {
  secret: string;
  expiresIn: string;
};

export type AuthKeys = {
  accessKey: Key;
  refreshKey: Key;
};

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async generateAccessToken(payload: any, accessKey: Key): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: accessKey.secret,
      expiresIn: accessKey.expiresIn,
    });
  }

  async generateRefreshToken(user: User, refreshKey: Key): Promise<string> {
    const refreshToken = this.jwtService.sign(
      { username: user.username },
      {
        secret: refreshKey.secret,
        expiresIn: refreshKey.expiresIn,
      },
    );

    const sevenDaysFromNow: number = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const expirationDate: Date = new Date(sevenDaysFromNow);

    await this.refreshTokenRepository.save(
      this.getRefreshToken(refreshToken, user, expirationDate),
    );

    return refreshToken;
  }

  async verifyAccessTokenOrThrow(
    accessToken: string,
    accessKey: Key,
  ): Promise<any> {
    try {
      return this.jwtService.verify(accessToken, {
        secret: accessKey.secret,
      });
    } catch (e) {
      throw new Error('Access token verification failed');
    }
  }

  async verifyRefreshTokenOrThrow(
    refreshToken: string,
    refreshKey: Key,
  ): Promise<any> {
    const existingRefreshToken =
      await this.refreshTokenRepository.findOneByToken(refreshToken);
    if (!existingRefreshToken) {
      throw new Error('Invalid refresh token');
    }
    try {
      return this.jwtService.verify(refreshToken, {
        secret: refreshKey.secret,
      });
    } catch (e) {
      throw new Error('Refresh token verification failed');
    }
  }

  async refreshAccessTokenOrThrow(
    refreshToken: string,
    authKeys: AuthKeys,
  ): Promise<string> {
    const payload = await this.verifyRefreshTokenOrThrow(
      refreshToken,
      authKeys.refreshKey,
    );
    const user = await this.userService.findByUsernameOrThrow(payload.username);
    return this.generateAccessToken(
      { username: user.username },
      authKeys.accessKey,
    );
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

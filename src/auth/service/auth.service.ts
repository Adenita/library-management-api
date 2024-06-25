import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private refreshTokens: string[] = []; // Store refresh tokens in a persistent storage in production

  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, { secret: 'accessSecretKey', expiresIn: '15m' });
  }

  async generateRefreshToken(payload: any): Promise<string> {
    const refreshToken = this.jwtService.sign(payload, { secret: 'refreshSecretKey', expiresIn: '7d' });
    this.refreshTokens.push(refreshToken); // Store refresh token
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
    if (!this.refreshTokens.includes(token)) {
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
    return this.generateAccessToken({ username: payload.username });
  }
}

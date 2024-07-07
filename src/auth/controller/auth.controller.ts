import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { Key, TokenService } from '../service/token.service';
import { TokenDto } from '../dto/token.dto';
import { UserCreateDto } from '../../modules/user/dto/user-create.dto';
import { UserShortDto } from '../../modules/user/dto/user-short.dto';

@Controller('auth')
export class AuthController {
  readonly accessKey: Key = {
    secret: process.env.ACCESS_SECRET_KEY,
    expiresIn: process.env.ACCESS_KEY_EXPIRATION_TIME,
  };
  readonly refreshKey: Key = {
    secret: process.env.REFRESH_SECRET_KEY,
    expiresIn: process.env.REFRESH_KEY_EXPIRATION_TIME,
  };

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('register')
  async register(@Body() userCreateDto: UserCreateDto): Promise<UserShortDto> {
    return this.authService.register(userCreateDto);
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<TokenDto> {
    return this.authService.login(
      userLoginDto,
      this.accessKey,
      this.refreshKey,
    );
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }): Promise<TokenDto> {
    const accessToken = await this.tokenService.refreshAccessTokenOrThrow(
      body.refreshToken,
      { accessKey: this.accessKey, refreshKey: this.refreshKey },
    );

    return { accessToken, refreshToken: body.refreshToken } as TokenDto;
  }
}

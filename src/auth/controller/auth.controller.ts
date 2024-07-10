import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AuthService, Token } from '../service/auth.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { Key, TokenService } from '../service/token.service';
import { TokenDto } from '../dto/token.dto';
import { UserCreateDto } from '../../modules/user/dto/user-create.dto';
import { UserShortDto } from '../../modules/user/dto/user-short.dto';
import { User } from '../../modules/user/entity/user.entity';
import { GeneralMapper } from '../../shared/general.mapper';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    @Inject('ACCESS_KEY') private readonly accessKey: Key,
    @Inject('REFRESH_KEY') private readonly refreshKey: Key,
  ) {}

  @Post('register')
  async register(@Body() userCreateDto: UserCreateDto): Promise<UserShortDto> {
    const registeredUser: User = await this.authService.register(userCreateDto);
    return GeneralMapper.toDto(UserShortDto, registeredUser);
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<TokenDto> {
    const token: Token = await this.authService.login(
      userLoginDto,
      this.accessKey,
      this.refreshKey,
    );

    return GeneralMapper.toDto(TokenDto, token);
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

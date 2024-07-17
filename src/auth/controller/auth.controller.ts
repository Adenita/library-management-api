import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AuthService, Token } from '../service/auth.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { Key, TokenService } from '../service/token.service';
import { TokenDto } from '../dto/token.dto';
import { UserCreateDto } from '../../modules/user/dto/user-create.dto';
import { UserShortDto } from '../../modules/user/dto/user-short.dto';
import { User } from '../../modules/user/entity/user.entity';
import { Mapper } from '../../shared/mapper';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@ApiTags('Library')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    @Inject('ACCESS_KEY') private readonly accessKey: Key,
    @Inject('REFRESH_KEY') private readonly refreshKey: Key,
  ) {}

  @ApiOperation({ summary: 'User register' })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed up.',
    type: UserShortDto,
  })
  @Post('register')
  async register(@Body() userCreateDto: UserCreateDto): Promise<UserShortDto> {
    const registeredUser: User = await this.authService.register(userCreateDto);
    return Mapper.toDto(UserShortDto, registeredUser);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
    type: TokenDto,
  })
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<TokenDto> {
    const token: Token = await this.authService.login(
      userLoginDto,
      this.accessKey,
      this.refreshKey,
    );

    return Mapper.toDto(TokenDto, token);
  }

  @ApiOperation({ summary: 'Access token refresh' })
  @ApiResponse({
    status: 200,
    description: 'Access token successfully refreshed.',
    type: TokenDto,
  })
  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenDto> {
    const accessToken = await this.tokenService.refreshAccessTokenOrThrow(
      refreshTokenDto.token,
      { accessKey: this.accessKey, refreshKey: this.refreshKey },
    );

    return { accessToken, refreshToken: refreshTokenDto.token } as TokenDto;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../modules/user/service/user.service';
import { Key, TokenService } from './token.service';
import { UserCreateDto } from '../../modules/user/dto/user-create.dto';
import { User } from '../../modules/user/entity/user.entity';
import { GeneralMapper } from '../../shared/general.mapper';
import { UserLoginDto } from '../dto/user-login.dto';
import { TokenDto } from '../dto/token.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async register(userCreateDto: UserCreateDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(userCreateDto.password, 10);
    const newUserDto: UserCreateDto = {
      ...userCreateDto,
      password: hashedPassword,
    };

    return await this.userService.createOrThrow(
      GeneralMapper.toEntity(User, newUserDto),
    );
  }

  async login(userLoginDto: UserLoginDto, accessKey: Key, refreshKey: Key) {
    const user: User = await this.validateUserOrThrow(
      userLoginDto.username,
      userLoginDto.password,
    );

    const accessToken: string = await this.tokenService.generateAccessToken(
      { username: user.username },
      accessKey,
    );
    const refreshToken: string = await this.tokenService.generateRefreshToken(
      user,
      refreshKey,
    );

    return {
      accessToken,
      refreshToken,
    } as TokenDto;
  }

  async validateUserOrThrow(username: string, password: string): Promise<User> {
    const user: User = await this.userService.findByIdOrThrow(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}

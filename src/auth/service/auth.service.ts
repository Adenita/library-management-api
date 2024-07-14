import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../modules/user/service/user.service';
import { Key, TokenService } from './token.service';
import { UserCreateDto } from '../../modules/user/dto/user-create.dto';
import { User } from '../../modules/user/entity/user.entity';
import { Mapper } from '../../shared/mapper';
import { UserLoginDto } from '../dto/user-login.dto';
import * as bcrypt from 'bcryptjs';

export class Token {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async register(userCreateDto: UserCreateDto): Promise<User> {
    const existingUser: User = await this.userService.findByUsername(
      userCreateDto.username,
    );
    if (existingUser) {
      throw new ConflictException(
        `User with username: ${userCreateDto.username} already exists`,
      );
    }

    const hashedPassword = await bcrypt.hash(userCreateDto.password, 10);
    const newUserDto: UserCreateDto = {
      ...userCreateDto,
      password: hashedPassword,
    };

    return await this.userService.createOrThrow(
      Mapper.toEntity(User, newUserDto),
    );
  }

  async login(
    userLoginDto: UserLoginDto,
    accessKey: Key,
    refreshKey: Key,
  ): Promise<Token> {
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
    } as Token;
  }

  async validateUserOrThrow(username: string, password: string): Promise<User> {
    const user: User = await this.userService.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from '../../modules/user/service/user.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}
}

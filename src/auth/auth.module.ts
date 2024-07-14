import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { Key, TokenService } from './service/token.service';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { RefreshToken } from './entity/refresh-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([RefreshToken, RefreshTokenRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    JWTStrategy,
    {
      provide: 'ACCESS_KEY',
      useFactory: (configService: ConfigService): Key => ({
        secret: configService.get<string>('ACCESS_SECRET_KEY'),
        expiresIn: configService.get<string>('ACCESS_KEY_EXPIRATION_TIME'),
      }),
      inject: [ConfigService],
    },
    {
      provide: 'REFRESH_KEY',
      useFactory: (configService: ConfigService): Key => ({
        secret: configService.get<string>('REFRESH_SECRET_KEY'),
        expiresIn: configService.get<string>('REFRESH_KEY_EXPIRATION_TIME'),
      }),
      inject: [ConfigService],
    },
    AuthService,
    TokenService,
    RefreshTokenRepository,
  ],
  controllers: [AuthController],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { Key } from './service/token.service';

@Module({
  imports: [
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
  ],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}

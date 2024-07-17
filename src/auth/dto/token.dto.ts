import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    description: 'The access token used for authentication',
  })
  @Expose()
  accessToken: string;

  @ApiProperty({
    description: 'The refresh token used to obtain a new access token',
  })
  @Expose()
  refreshToken: string;
}

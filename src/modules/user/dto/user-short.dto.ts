import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserShortDto {
  @ApiProperty({
    example: 'efsdsccd...',
    description: 'The id of the user',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'john_doe',
    description: 'The username of the user',
  })
  @Expose()
  username: string;

  @ApiProperty({
    example: 'john_doe@email.com',
    description: 'The email of the user',
  })
  @Expose()
  email: string;
}

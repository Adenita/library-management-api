import { UserShortDto } from './user-short.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserListDto {
  @ApiProperty({
    description: 'List of users',
  })
  items: UserShortDto[];
}

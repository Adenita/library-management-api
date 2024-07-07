import { User } from '../entity/user.entity';
import { GeneralMapper } from '../../../shared/general.mapper';
import { UserShortDto } from '../dto/user-short.dto';
import { UserListDto } from '../dto/user-list.dto';

export class UserMapper {
  static toListTransport(users: User[]): UserListDto {
    return { items: this.toListDto(users) } as UserListDto;
  }

  private static toListDto(users: User[]): UserShortDto[] {
    return users.map((user: User) => GeneralMapper.toDto(UserShortDto, user));
  }

  static toEntity(dto: any): User {
    return GeneralMapper.toEntity(User, dto);
  }
}

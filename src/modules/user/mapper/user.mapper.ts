import { User } from '../entity/user.entity';
import { Mapper } from '../../../shared/Mapper';
import { UserShortDto } from '../transport/user-short.dto';
import { UserCreateDto } from '../transport/user-create.dto';
import { UserUpdateDto } from '../transport/user-update.dto';

export class UserMapper {
  static toShortDto(user: User) {
    return Mapper.toDto(UserShortDto, user);
  }

  static toCreateRequestDto(user: User) {
    return Mapper.toDto(UserCreateDto, user);
  }

  static toUpdateRequestDto(user: User) {
    return Mapper.toDto(UserUpdateDto, user);
  }

  static toListTransport(users: User[]) {
    return users.map((user: User) => this.toShortDto(user));
  }

  static toEntity(dto: any) {
    return Mapper.toEntity(User, dto);
  }
}

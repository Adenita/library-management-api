import { User } from '../entity/user.entity';
import { Mapper } from '../../../shared/Mapper';

export class UserMapper {
  static toListTransport(users: User[]) {
    return users.map((user: User) => this.toShortDto(user));
  }

  static toEntity(dto: any) {
    return Mapper.toEntity(User, dto);
  }
}

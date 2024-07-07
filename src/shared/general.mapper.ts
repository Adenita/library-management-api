import { plainToInstance } from 'class-transformer';

export class GeneralMapper {
  static toDto<T, V>(cls: new () => T, plain: V): T {
    return plainToInstance(cls, plain);
  }

  static toEntity<T, V>(cls: new () => T, dto: V): T {
    return plainToInstance(cls, dto);
  }
}

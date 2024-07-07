import { UserCreateDto } from './user-create.dto';
import { PartialType } from '@nestjs/swagger';

export class UserUpdateDto extends PartialType(UserCreateDto) {}

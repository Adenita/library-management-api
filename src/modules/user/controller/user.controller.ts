import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserListDto } from '../dto/user-list.dto';
import { UserShortDto } from '../dto/user-short.dto';
import { UserMapper } from '../mapper/user.mapper';
import { User } from '../entity/user.entity';
import { GeneralMapper } from '../../../shared/general.mapper';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RoleType } from '../entity/role.enum';
import { Roles } from '../../../auth/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserListDto> {
    const users: User[] = await this.userService.findAll();
    return UserMapper.toListTransport(users);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserShortDto> {
    const user: User = await this.userService.findByIdOrThrow(id);
    return GeneralMapper.toDto(UserShortDto, user);
  }

  @Post()
  @Roles([RoleType.ADMIN])
  async create(@Body() userCreateDto: UserCreateDto): Promise<UserShortDto> {
    const userToCreate: User = UserMapper.toEntity(userCreateDto);
    const userCreated: User =
      await this.userService.createOrThrow(userToCreate);
    return GeneralMapper.toDto(UserShortDto, userCreated);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserShortDto> {
    const userToUpdate: User = UserMapper.toEntity(userUpdateDto);
    await this.userService.updateOrThrow(id, userToUpdate);
    return GeneralMapper.toDto(UserShortDto, userToUpdate);
  }

  @Roles([RoleType.ADMIN])
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.userService.remove(id);
  }
}

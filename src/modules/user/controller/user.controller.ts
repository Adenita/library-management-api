import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserListDto } from '../dto/user-list.dto';
import { UserShortDto } from '../dto/user-short.dto';
import { UserMapper } from '../mapper/user.mapper';
import { User } from '../entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserListDto> {
    const users = await this.userService.findAll();
    return { items: UserMapper.toListTransport(users) };
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserShortDto> {
    const user: User = await this.userService.findByIdOrThrow(id);
    return UserMapper.toShortDto(user);
  }

  @Post()
  async create(@Body() UserCreateDto: UserCreateDto): Promise<UserShortDto> {
    const userToCreate: User = UserMapper.toEntity(UserCreateDto);
    const userCreated: User = await this.userService.createOrThrow(userToCreate);
    return UserMapper.toShortDto(userCreated);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() UserUpdateDto: UserUpdateDto,
  ): Promise<UserShortDto> {
    const userToUpdate: User = UserMapper.toEntity(UserUpdateDto);
    await this.userService.updateOrThrow(id, userToUpdate);
    return UserMapper.toShortDto(userToUpdate);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.userService.remove(id);
  }
}

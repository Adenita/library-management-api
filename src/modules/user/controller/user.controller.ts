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
import { UserCreateDto } from '../transport/user-create.dto';
import { UserUpdateDto } from '../transport/user-update.dto';
import { UserListDto } from '../transport/user-list.dto';
import { UserShortDto } from '../transport/user-short.dto';
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
    const user: User = await this.userService.findById(id);
    return UserMapper.toShortDto(user);
  }

  @Post()
  async create(@Body() UserCreateDto: UserCreateDto): Promise<UserShortDto> {
    const userToCreate: User = UserMapper.toEntity(UserCreateDto);
    const userCreated: User = await this.userService.create(userToCreate);
    return UserMapper.toShortDto(userCreated);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() UserUpdateDto: UserUpdateDto,
  ): Promise<UserShortDto> {
    const userToUpdate: User = UserMapper.toEntity(UserUpdateDto);
    await this.userService.update(id, userToUpdate);
    return UserMapper.toShortDto(userToUpdate);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.userService.remove(id);
  }
}

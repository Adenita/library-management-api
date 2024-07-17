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
import { Mapper } from '../../../shared/mapper';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RoleType } from '../entity/role.enum';
import { Roles } from '../../../auth/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Return all users.',
    type: UserListDto,
  })
  @Get()
  async findAll(): Promise<UserListDto> {
    const users: User[] = await this.userService.findAll();
    return UserMapper.toListTransport(users);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'Return user by id.',
    type: UserShortDto,
  })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserShortDto> {
    const user: User = await this.userService.findByIdOrThrow(id);
    return Mapper.toDto(UserShortDto, user);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 200,
    description: 'User created successfully.',
    type: UserShortDto,
  })
  @Post()
  @Roles([RoleType.ADMIN])
  async create(@Body() userCreateDto: UserCreateDto): Promise<UserShortDto> {
    const userToCreate: User = Mapper.toEntity(User, userCreateDto);
    const userCreated: User =
      await this.userService.createOrThrow(userToCreate);
    return Mapper.toDto(UserShortDto, userCreated);
  }

  @ApiOperation({ summary: 'Update user with given id' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
    type: UserShortDto,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserShortDto> {
    const userToUpdate: User = Mapper.toEntity(User, userUpdateDto);
    await this.userService.updateOrThrow(id, userToUpdate);
    return Mapper.toDto(UserShortDto, userToUpdate);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully.',
  })
  @Roles([RoleType.ADMIN])
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.userService.remove(id);
  }
}

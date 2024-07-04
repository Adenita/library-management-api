import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findByIdOrThrow(id: string): Promise<User> {
    const user: User = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    return user;
  }

  async findByUsernameOrThrow(username: string): Promise<User> {
    const user: User = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new NotFoundException(`User with username: ${username} not found`);
    }
    return user;
  }

  async createOrThrow(user: User): Promise<User> {
    const existingUser: User = await this.findByUsernameOrThrow(user.username);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    return await this.userRepository.create(user);
  }

  async updateOrThrow(id: string, user: User): Promise<void> {
    const updatedUser = await this.findByIdOrThrow(id);
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepository.update(id, user);
  }

  async remove(id: string): Promise<void> {
    return await this.userRepository.remove(id);
  }
}

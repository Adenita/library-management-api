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

  async findById(id: string): Promise<User> {
    const user: User = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    return user;
  }

  async create(user: User): Promise<User> {
    const existingUser: User = await this.userRepository.findByUsername(
      user.username,
    );
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    return await this.userRepository.create(user);
  }

  async update(id: string, user: User): Promise<void> {
    const updatedUser = await this.userRepository.findById(id);
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepository.update(id, user);
  }

  async remove(id: string): Promise<void> {
    return await this.userRepository.remove(id);
  }
}

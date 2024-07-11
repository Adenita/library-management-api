import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from './repository/author.repository';
import { Author } from './entity/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author, AuthorRepository])],
  controllers: [],
  providers: [],
})
export class AuthorModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from './repository/author.repository';
import { Author } from './entity/author.entity';
import { AuthorService } from './service/author.service';

@Module({
  imports: [TypeOrmModule.forFeature([Author, AuthorRepository])],
  controllers: [],
  providers: [AuthorService, AuthorRepository],
})
export class AuthorModule {}

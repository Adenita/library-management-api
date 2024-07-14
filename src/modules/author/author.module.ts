import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from './repository/author.repository';
import { Author } from './entity/author.entity';
import { AuthorService } from './service/author.service';
import { AuthorController } from './controller/author.controller';
import { BookModule } from '../book/book.module';

@Module({
  imports: [TypeOrmModule.forFeature([Author, AuthorRepository]), BookModule],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository],
  exports: [AuthorService],
})
export class AuthorModule {}

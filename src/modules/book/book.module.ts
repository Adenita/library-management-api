import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { BookRepository } from './repository/book.repository';
import { BookService } from './service/book.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookRepository])],
  controllers: [],
  providers: [BookService],
})
export class BookModule {}

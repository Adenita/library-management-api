import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { BookRepository } from './repository/book.repository';
import { BookService } from './service/book.service';
import { BookController } from './controller/book.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookRepository])],
  controllers: [BookController],
  providers: [BookService, BookRepository],
  exports: [BookService],
})
export class BookModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { BookRepository } from './repository/book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookRepository])],
  controllers: [],
  providers: [],
})
export class BookModule {}

import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../book/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 100})
  name: string;

  @ManyToMany(() => Book, book => book.authors)
  @JoinTable({name: 'author_books'})
  books: Book[];
}
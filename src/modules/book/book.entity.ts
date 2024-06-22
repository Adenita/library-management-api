import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from '../author/author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Author, author => author.books)
  authors: Author[];
}
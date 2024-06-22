import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from '../author/author.entity';
import { Loan } from '../loan/loan.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => Author, author => author.books)
  authors: Author[];

  @OneToMany(() => Loan, (loan) => loan.book)
  loans: Loan[];
}
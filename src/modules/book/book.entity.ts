import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from '../author/author.entity';
import { Loan } from '../loan/loan.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 100})
  title: string;

  @Column()
  available_copies: number;

  @Column({ length: 30 })
  language: string;

  @ManyToMany(() => Author, author => author.books)
  authors: Author[];

  @OneToMany(() => Loan, (loan) => loan.book)
  loans: Loan[];
}
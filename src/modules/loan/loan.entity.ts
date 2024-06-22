import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Book } from '../book/book.entity';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => User, (user) => user.loans)
  user: User;

  @ManyToOne(() => Book, (book) => book.loans)
  book: Book;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  loan_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  due_date: Date;

  @Column({length: 60})
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  return_date: Date;
}
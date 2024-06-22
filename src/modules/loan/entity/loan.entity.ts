import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Book } from '../../book/entity/book.entity';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.loans)
  user: User;

  @ManyToOne(() => Book, (book) => book.loans)
  book: Book;

  @Column({
    name: 'loan_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  loanDate: Date;

  @Column({ name: 'due_date', type: 'timestamp', nullable: true })
  dueDate: Date;

  @Column({ length: 60 })
  status: string;

  @Column({ name: 'return_date', type: 'timestamp', nullable: true })
  returnDate: Date;
}

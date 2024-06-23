import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Book } from '../../book/entity/book.entity';
import { StatusEnum } from './status.enum';

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

  @Column({ type: 'varchar', length: 60 })
  status: StatusEnum;

  @Column({ name: 'return_date', type: 'timestamp', nullable: true })
  returnDate: Date;
}

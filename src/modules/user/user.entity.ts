import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Loan } from '../loan/loan.entity';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Loan, (loan) => loan.user)
    loans: Loan[];
}

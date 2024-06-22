import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Loan } from '../loan/loan.entity';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 100})
    name: string;

    @Column({length: 100})
    username: string;

    @Column({length: 500})
    password: string;

    @Column({length: 100})
    email: string;

    @OneToMany(() => Loan, (loan) => loan.user)
    loans: Loan[];
}

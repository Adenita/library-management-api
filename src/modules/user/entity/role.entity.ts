import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleType } from './role.enum';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: RoleType;
}

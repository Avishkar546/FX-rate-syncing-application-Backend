// account.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Balance } from './balance.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  panCardNumber: string;

  // Define one-to-many relationship with Balances entity
  @OneToMany(() => Balance, balance => balance.account)
  balances: Balance[];
}

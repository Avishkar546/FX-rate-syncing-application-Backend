// balance.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currency: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  // Define many-to-one relationship with Account entity
  @ManyToOne(() => Account, account => account.balances)
  account: Account;
}

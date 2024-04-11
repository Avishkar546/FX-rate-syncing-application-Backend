import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}
  topUpAccount(currency: string, amount: number): string {
    return `Successfully topped up ${amount} ${currency}`;
  }

  async getAccountBalances(
    userId: string,
  ): Promise<{ [currency: string]: number }> {
    const account = await this.accountRepository.findOne({
      where: { userId },
      relations: ['balances'],
    });     

    if (!account) {
      throw new Error('User account not found');
    }

    // Extract balances for each currency
    const balances = {};
    account.balances.forEach((balance) => {
      balances[balance.currency] = balance.amount;
    });

    return balances;
  }
}

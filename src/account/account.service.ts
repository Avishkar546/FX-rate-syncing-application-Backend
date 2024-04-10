import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  topUpAccount(currency: string, amount: number): string {
    return `Successfully topped up ${amount} ${currency}`;
  }
}

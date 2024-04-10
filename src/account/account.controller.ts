import { Controller, Post, Body } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
   
  @Post('topup')
  topUpAccount(
    @Body('currency') currency: string,
    @Body('amount') amount: number,
  ): string {
    return this.accountService.topUpAccount(currency, amount);
  }
}

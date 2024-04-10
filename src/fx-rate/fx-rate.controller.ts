// fx-rate.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { FXRateService } from './fx-rate.service';

@Controller('fx-rates')
export class FXRateController {
  constructor(private readonly fxRateService: FXRateService) {}

  @Get()
  async fetchFXRates(
    @Query('fromCurrency') fromCurrency: string,
    @Query('toCurrency') toCurrency: string,
  ): Promise<string | null> {
    // this.fxRateService.fetchFXRates();
    return this.fxRateService.fetchFXRates(fromCurrency, toCurrency);
  }
}

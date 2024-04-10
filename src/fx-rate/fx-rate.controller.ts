// fx-rate.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { FXRateService } from './fx-rate.service';
import { v4 as uuidv4 } from 'uuid';
import * as cache from 'memory-cache';

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

  @Get()
  async fetchFXRatesWithQuote(): Promise<{
    quoteId: string;
    expiry_at: number;
    fxRates: any;
  }> {
    // Fetch FX rates from memory cache
    const fxRates = cache.keys().map((key) => ({
      fromCurrency: key.split('_')[1],
      toCurrency: key.split('_')[2],
      rate: cache.get(key),
    }));

    // Generate quoteId and expiry_at
    const quoteId = uuidv4();
    const expiry_at = Date.now() + 30 * 1000;

    // Return response including quoteId, expiry_at, and fetched FX rates
    return { quoteId, expiry_at, fxRates };
  }
}

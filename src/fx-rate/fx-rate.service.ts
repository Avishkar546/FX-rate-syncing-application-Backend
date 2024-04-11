// fx-rate.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cache from 'memory-cache';

@Injectable()
export class FXRateService {
  private readonly CACHE_KEY_PREFIX = 'fxRate_';

  async fetchFXRates(
    fromCurrency: string,
    toCurrency: string,
  ): Promise<string | null> {
    const cacheKey = this.generateCacheKey(fromCurrency, toCurrency);
    const cachedFXRate = cache.get(cacheKey);

    // Return cached rate if available and not expired
    if (cachedFXRate) {
      return cachedFXRate;
    }

    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${process.env.API_KEY}`,
      );
      const fxRate =
        response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'];

      // Cache the fetched FX rate for 30 seconds
      cache.put(cacheKey, fxRate, 30000);

      return fxRate;
    } catch (error) {
      console.error('Error fetching FX rates:', error);
      return null;
    }
  }

  private generateCacheKey(fromCurrency: string, toCurrency: string): string {
    return `${this.CACHE_KEY_PREFIX}${fromCurrency}_${toCurrency}`;
  }

  async convertFX(
    fromCurrency: string,
    toCurrency: string,
    amount: number,
    quoteId: string,
  ): Promise<number> {
    // Check if the provided quoteId exists in the memory cache
    const cachedFXRate = cache.get(quoteId);
    if (!cachedFXRate) {
      throw new Error('Invalid or expired quoteId');
    }

    // Perform the conversion using the cached FX rate
    const conversionRate = cachedFXRate[fromCurrency][toCurrency];
    if (!conversionRate) {
      throw new Error(
        'Conversion rate not available for the specified currencies',
      );
    }

    // Calculate the converted amount
    const convertedAmount = amount * conversionRate;

    return convertedAmount;
  }
}

// fx-rate.module.ts
import { Module } from '@nestjs/common';
import { FXRateService } from './fx-rate.service';
import { FXRateController } from './fx-rate.controller';

@Module({
  providers: [FXRateService],
  controllers: [FXRateController],
})
export class FXRateModule {}

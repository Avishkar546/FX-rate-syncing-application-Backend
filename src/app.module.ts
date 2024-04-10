import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FXRateModule } from './fx-rate/fx-rate.module';
import { FXRateController } from './fx-rate/fx-rate.controller';
import { FXRateService } from './fx-rate/fx-rate.service';
import { AccountModule } from './account/account.module';

@Module({
  imports: [FXRateModule, AccountModule],
  controllers: [AppController, FXRateController],
  providers: [AppService, FXRateService],
})
export class AppModule {}

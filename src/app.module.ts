import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceModule } from './price/price.module';
import { BaScraperService } from './ba-scraper/ba-scraper.service';

@Module({
  imports: [PriceModule],
  controllers: [AppController],
  providers: [AppService, BaScraperService],
})
export class AppModule {}

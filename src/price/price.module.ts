import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { BaScraperService } from 'src/ba-scraper/ba-scraper.service';

@Module({
  controllers: [PriceController],
  providers: [PriceService, BaScraperService]
})
export class PriceModule { }

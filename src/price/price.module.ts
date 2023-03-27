import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { ProductPuppeteerScraper } from 'src/infra/web-scrapers/precodahora/product-puppeteer.scraper';

@Module({
  controllers: [PriceController],
  providers: [PriceService, ProductPuppeteerScraper]
})
export class PriceModule { }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceModule } from './price/price.module';
import { getBeerPriceUseCase } from './application/getBeerPriceUseCase';
import { PrismaService } from './infra/database/prisma.service';
import { ProductPuppeteerScraper } from './infra/web-scrapers/precodahora/product-puppeteer.scraper';
import { ProductPrismaRepo } from './infra/database/product-prisma.repo';

@Module({
  imports: [PriceModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, ProductPuppeteerScraper, ProductPrismaRepo, {
    provide: getBeerPriceUseCase,
    useFactory: (scrapService: ProductPuppeteerScraper, productPrismaRepo: ProductPrismaRepo) => {
      return new getBeerPriceUseCase(scrapService, productPrismaRepo)
    }, inject: [ProductPuppeteerScraper, ProductPrismaRepo]
  }],
})
export class AppModule { }

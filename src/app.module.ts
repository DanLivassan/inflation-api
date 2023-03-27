import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getBeerPriceUseCase } from './application/getBeerPriceUseCase';
import { PrismaService } from './infra/database/prisma.service';
import { ProductPuppeteerScraper } from './infra/web-scrapers/precodahora/product-puppeteer.scraper';
import { ProductPrismaRepo } from './infra/database/product-prisma.repo';
import { GetBasicShopUseCase } from './application/getBasicShopUseCase';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, ProductPuppeteerScraper, ProductPrismaRepo,
    {
      provide: getBeerPriceUseCase,
      useFactory: (scrapService: ProductPuppeteerScraper, productPrismaRepo: ProductPrismaRepo) => {
        return new getBeerPriceUseCase(scrapService, productPrismaRepo)
      }, inject: [ProductPuppeteerScraper, ProductPrismaRepo]
    },
    {
      provide: GetBasicShopUseCase,
      useFactory: (scrapService: ProductPuppeteerScraper, productPrismaRepo: ProductPrismaRepo) => {
        return new GetBasicShopUseCase(scrapService, productPrismaRepo)
      }, inject: [ProductPuppeteerScraper, ProductPrismaRepo]
    }
  ],
})
export class AppModule { }

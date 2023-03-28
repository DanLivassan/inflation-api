import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './infra/database/prisma.service';
import { ProductPuppeteerScraper } from './infra/web-scrapers/precodahora/product-puppeteer.scraper';
import { ProductPrismaRepo } from './infra/database/product-prisma.repo';
import { GetBasicShopUseCase } from './application/getBasicShopUseCase';
import { CalculateBasicDailyPriceUseCase } from './application/calculateBasicDailyPriceUseCase';
import { InflationPrismaRepo } from './infra/database/inflation-prisma.repo';
import { ScheduleModule } from '@nestjs/schedule';
import { GetDailyPricesUseCase } from './application/getDailyPricesUseCase';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaService, ProductPuppeteerScraper, ProductPrismaRepo, InflationPrismaRepo,
    {
      provide: GetBasicShopUseCase,
      useFactory: (scrapService: ProductPuppeteerScraper, productPrismaRepo: ProductPrismaRepo) => {
        return new GetBasicShopUseCase(scrapService, productPrismaRepo)
      }, inject: [ProductPuppeteerScraper, ProductPrismaRepo]
    },
    {
      provide: CalculateBasicDailyPriceUseCase,
      useFactory: (productPrismaRepo: ProductPrismaRepo, inflationRepo: InflationPrismaRepo) => {
        return new CalculateBasicDailyPriceUseCase(productPrismaRepo, inflationRepo)
      }, inject: [ProductPrismaRepo, InflationPrismaRepo]
    },
    {
      provide: GetDailyPricesUseCase,
      useFactory: (inflationRepo: InflationPrismaRepo) => {
        return new GetDailyPricesUseCase(inflationRepo)
      }, inject: [InflationPrismaRepo]
    }
  ],
})
export class AppModule { }

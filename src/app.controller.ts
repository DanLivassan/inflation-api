import { Controller, Get, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CalculateBasicDailyPriceUseCase } from './application/calculateBasicDailyPriceUseCase';
import { GetBasicShopUseCase } from './application/getBasicShopUseCase';
import { getBeerPriceUseCase } from './application/getBeerPriceUseCase';

@Controller()
export class AppController {
  private logger: Logger;
  constructor(
    private getBeerPriceUseCase: getBeerPriceUseCase,
    private getBasicShopUseCase: GetBasicShopUseCase,
    private calculateBasicDailyPriceUseCase: CalculateBasicDailyPriceUseCase
  ) {
    this.logger = new Logger('APP Controller')
  }
  @Get()
  async fire() {
    this.logger.log('Getting beers...')
    const products = await this.getBeerPriceUseCase.execute()
    return products
  }
  @Cron('45 21 * * *')
  @Get('/basic')
  async basic() {
    this.logger.log('Getting basic products...')
    const products = await this.getBasicShopUseCase.execute()
    return products.map(p => {
      return { ...p, ncm: p.ncm.toString() }
    })
  }
  @Cron(CronExpression.EVERY_10_MINUTES)
  @Get('/calculate')
  async calculate() {
    this.logger.log('Calculate basic products...')
    const products = await this.calculateBasicDailyPriceUseCase.execute()
  }
}

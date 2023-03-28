import { Controller, Get, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CalculateBasicDailyPriceUseCase } from './application/calculateBasicDailyPriceUseCase';
import { GetBasicShopUseCase } from './application/getBasicShopUseCase';
import { GetDailyPricesUseCase } from './application/getDailyPricesUseCase';
import { every_day } from './infra/utils/constants';

@Controller()
export class AppController {
  private logger: Logger;
  constructor(
    private readonly getBasicShopUseCase: GetBasicShopUseCase,
    private readonly calculateBasicDailyPriceUseCase: CalculateBasicDailyPriceUseCase,
    private readonly getDailyPricesUseCase: GetDailyPricesUseCase
  ) {
    this.logger = new Logger('APP Controller')
  }

  @Cron(every_day('11', '00'))
  async basic() {
    this.logger.log('Getting basic products...')
    const products = await this.getBasicShopUseCase.execute()
    return products.map(p => {
      return { ...p, ncm: p.ncm.toString() }
    })
  }
  @Cron(every_day('11', '45'))
  async calculate() {
    this.logger.log('Calculate basic products...')
    await this.calculateBasicDailyPriceUseCase.execute()
  }

  @Get('history')
  async history() {
    this.logger.log('Retrieving basic products values...')
    return await this.getDailyPricesUseCase.execute()
  }
}

import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { CalculateBasicShopUseCase } from './application/calculateBasicShopUseCase';
import { getBeerPriceUseCase } from './application/getBeerPriceUseCase';

@Controller()
export class AppController {
  private logger: Logger;
  constructor(private getBeerPriceUseCase: getBeerPriceUseCase, private calculateBasicShopUseCase: CalculateBasicShopUseCase) {
    this.logger = new Logger('APP Controller')
  }
  @Get()
  async fire() {
    this.logger.log('Getting beers...')
    const products = await this.getBeerPriceUseCase.execute()
    return products
  }
  @Get('/basic')
  async basic() {
    this.logger.log('Getting basic products...')
    const products = await this.calculateBasicShopUseCase.execute()
    return products.map(p => {
      return { ...p, ncm: p.ncm.toString() }
    })
  }
}

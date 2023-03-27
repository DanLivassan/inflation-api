import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { getBeerPriceUseCase } from './application/getBeerPriceUseCase';

@Controller()
export class AppController {
  private logger: Logger;
  constructor(private getBeerPriceUseCase: getBeerPriceUseCase) {
    this.logger = new Logger('APP Controller')
  }
  @Get()
  async fire() {
    this.logger.log('Getting products...')
    const products = await this.getBeerPriceUseCase.execute()
    return products
  }
}

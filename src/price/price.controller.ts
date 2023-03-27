import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { ProductPuppeteerScraper } from 'src/infra/web-scrapers/precodahora/product-puppeteer.scraper';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService, private productScraper: ProductPuppeteerScraper) { }

  @Post()
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.priceService.create(createPriceDto);
  }

  @Get()
  async findAll() {
    return await this.productScraper.getProducts('BANANA');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePriceDto: UpdatePriceDto) {
    return this.priceService.update(+id, updatePriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceService.remove(+id);
  }
}

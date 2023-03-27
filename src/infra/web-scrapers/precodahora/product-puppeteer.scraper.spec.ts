import { Test, TestingModule } from '@nestjs/testing';
import { ProductPuppeteerScraper } from './product-puppeteer.scraper';

describe('BaScraperService', () => {
  let service: ProductPuppeteerScraper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductPuppeteerScraper],
    }).compile();

    service = module.get<ProductPuppeteerScraper>(ProductPuppeteerScraper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

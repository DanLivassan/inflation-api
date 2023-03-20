import { Test, TestingModule } from '@nestjs/testing';
import { BaScraperService } from './ba-scraper.service';

describe('BaScraperService', () => {
  let service: BaScraperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaScraperService],
    }).compile();

    service = module.get<BaScraperService>(BaScraperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

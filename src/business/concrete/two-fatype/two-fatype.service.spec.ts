import { Test, TestingModule } from '@nestjs/testing';
import { TwoFatypeService } from './two-fatype.service';

describe('TwoFatypeService', () => {
  let service: TwoFatypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwoFatypeService],
    }).compile();

    service = module.get<TwoFatypeService>(TwoFatypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

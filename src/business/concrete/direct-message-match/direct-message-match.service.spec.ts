import { Test, TestingModule } from '@nestjs/testing';
import { DirectMessageMatchService } from './direct-message-match.service';

describe('DirectMessageMatchService', () => {
  let service: DirectMessageMatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectMessageMatchService],
    }).compile();

    service = module.get<DirectMessageMatchService>(DirectMessageMatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

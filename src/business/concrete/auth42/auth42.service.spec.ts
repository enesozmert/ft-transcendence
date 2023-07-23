import { Test, TestingModule } from '@nestjs/testing';
import { Auth42Service } from './auth42.service';

describe('Auth42Service', () => {
  let service: Auth42Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Auth42Service],
    }).compile();

    service = module.get<Auth42Service>(Auth42Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

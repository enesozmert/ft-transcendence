import { Test, TestingModule } from '@nestjs/testing';
import { Auth42Controller } from './auth42.controller';

describe('Auth42Controller', () => {
  let controller: Auth42Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Auth42Controller],
    }).compile();

    controller = module.get<Auth42Controller>(Auth42Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TwoFasController } from './two-fas.controller';

describe('TwoFasController', () => {
  let controller: TwoFasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwoFasController],
    }).compile();

    controller = module.get<TwoFasController>(TwoFasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

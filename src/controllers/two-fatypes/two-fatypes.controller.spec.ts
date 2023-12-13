import { Test, TestingModule } from '@nestjs/testing';
import { TwoFatypesController } from './two-fatypes.controller';

describe('TwoFatypesController', () => {
  let controller: TwoFatypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwoFatypesController],
    }).compile();

    controller = module.get<TwoFatypesController>(TwoFatypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

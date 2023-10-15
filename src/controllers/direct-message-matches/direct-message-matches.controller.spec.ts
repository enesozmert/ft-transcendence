import { Test, TestingModule } from '@nestjs/testing';
import { DirectMessageMatchesController } from './direct-message-matches.controller';

describe('DirectMessageMatchesController', () => {
  let controller: DirectMessageMatchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectMessageMatchesController],
    }).compile();

    controller = module.get<DirectMessageMatchesController>(DirectMessageMatchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

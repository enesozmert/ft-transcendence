import { Test, TestingModule } from '@nestjs/testing';
import { UserBlocksController } from './user-blocks.controller';

describe('UserBlocksController', () => {
  let controller: UserBlocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBlocksController],
    }).compile();

    controller = module.get<UserBlocksController>(UserBlocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

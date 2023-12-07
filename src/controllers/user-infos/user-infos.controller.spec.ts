import { Test, TestingModule } from '@nestjs/testing';
import { UserInfosController } from './user-infos.controller';

describe('UserInfosController', () => {
  let controller: UserInfosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserInfosController],
    }).compile();

    controller = module.get<UserInfosController>(UserInfosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

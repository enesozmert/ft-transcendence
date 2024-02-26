import { Test, TestingModule } from '@nestjs/testing';
import { UserTwoFasController } from './user-two-fas.controller';

describe('UserTwoFasController', () => {
  let controller: UserTwoFasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTwoFasController],
    }).compile();

    controller = module.get<UserTwoFasController>(UserTwoFasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserFriendsController } from './user-friends.controller';

describe('UserFriendsController', () => {
  let controller: UserFriendsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFriendsController],
    }).compile();

    controller = module.get<UserFriendsController>(UserFriendsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

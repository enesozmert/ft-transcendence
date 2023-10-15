import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomUsersController } from './chat-room-users.controller';

describe('ChatRoomUsersController', () => {
  let controller: ChatRoomUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatRoomUsersController],
    }).compile();

    controller = module.get<ChatRoomUsersController>(ChatRoomUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

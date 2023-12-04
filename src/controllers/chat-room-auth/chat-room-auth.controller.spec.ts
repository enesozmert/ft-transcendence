import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomAuthController } from './chat-room-auth.controller';

describe('ChatRoomAuthController', () => {
  let controller: ChatRoomAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatRoomAuthController],
    }).compile();

    controller = module.get<ChatRoomAuthController>(ChatRoomAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

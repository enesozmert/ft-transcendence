import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomPropertiesController } from './chat-room-properties.controller';

describe('ChatRoomPropertiesController', () => {
  let controller: ChatRoomPropertiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatRoomPropertiesController],
    }).compile();

    controller = module.get<ChatRoomPropertiesController>(ChatRoomPropertiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

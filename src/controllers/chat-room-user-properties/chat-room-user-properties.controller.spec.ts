import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomUserPropertiesController } from './chat-room-user-properties.controller';

describe('ChatRoomUserPropertiesController', () => {
  let controller: ChatRoomUserPropertiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatRoomUserPropertiesController],
    }).compile();

    controller = module.get<ChatRoomUserPropertiesController>(ChatRoomUserPropertiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomTypesController } from './chat-room-types.controller';

describe('ChatRoomTypesController', () => {
  let controller: ChatRoomTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatRoomTypesController],
    }).compile();

    controller = module.get<ChatRoomTypesController>(ChatRoomTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

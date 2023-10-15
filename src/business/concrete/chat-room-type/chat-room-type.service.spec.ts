import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomTypeService } from './chat-room-type.service';

describe('ChatRoomTypeService', () => {
  let service: ChatRoomTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRoomTypeService],
    }).compile();

    service = module.get<ChatRoomTypeService>(ChatRoomTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

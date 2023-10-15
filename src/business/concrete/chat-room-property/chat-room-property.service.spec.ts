import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomPropertyService } from './chat-room-property.service';

describe('ChatRoomPropertyService', () => {
  let service: ChatRoomPropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRoomPropertyService],
    }).compile();

    service = module.get<ChatRoomPropertyService>(ChatRoomPropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

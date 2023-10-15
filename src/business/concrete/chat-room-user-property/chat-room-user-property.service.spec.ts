import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomUserPropertyService } from './chat-room-user-property.service';

describe('ChatRoomUserPropertyService', () => {
  let service: ChatRoomUserPropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRoomUserPropertyService],
    }).compile();

    service = module.get<ChatRoomUserPropertyService>(ChatRoomUserPropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

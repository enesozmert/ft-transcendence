import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomAuthService } from './chat-room-auth.service';

describe('ChatRoomAuthService', () => {
  let service: ChatRoomAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRoomAuthService],
    }).compile();

    service = module.get<ChatRoomAuthService>(ChatRoomAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

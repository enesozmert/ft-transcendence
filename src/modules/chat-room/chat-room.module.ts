import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomService } from 'src/business/concrete/chat-room/chat-room.service';
import { ChatRoomsController } from 'src/controllers/chat-rooms/chat-rooms.controller';
import { ChatRoom } from 'src/entities/concrete/chatRoom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  controllers: [ChatRoomsController],
  providers: [ChatRoomService],
  exports: [TypeOrmModule, ChatRoomService],
})
export class ChatRoomModule {}
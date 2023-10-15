import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomUserPropertyService } from 'src/business/concrete/chat-room-user-property/chat-room-user-property.service';
import { ChatRoomUserPropertiesController } from 'src/controllers/chat-room-user-properties/chat-room-user-properties.controller';
import { ChatRoomUserProperty } from 'src/entities/concrete/chatRoomUserProperty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomUserProperty])],
  controllers: [ChatRoomUserPropertiesController],
  providers: [ChatRoomUserPropertyService],
  exports: [TypeOrmModule, ChatRoomUserPropertyService],
})
export class ChatRoomUserPropertyModule {}

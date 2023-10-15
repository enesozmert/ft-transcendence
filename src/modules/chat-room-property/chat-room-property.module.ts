import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomProperty } from 'src/entities/concrete/chatRoomProperty.entity';
import { ChatRoomPropertyService } from 'src/business/concrete/chat-room-property/chat-room-property.service';
import { ChatRoomPropertiesController } from 'src/controllers/chat-room-properties/chat-room-properties.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomProperty])],
  controllers: [ChatRoomPropertiesController],
  providers: [ChatRoomPropertyService],
  exports: [TypeOrmModule, ChatRoomPropertyService],
})
export class ChatRoomPropertyModule {}
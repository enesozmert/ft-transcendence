import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomTypeService } from 'src/business/concrete/chat-room-type/chat-room-type.service';
import { ChatRoomTypesController } from 'src/controllers/chat-room-types/chat-room-types.controller';
import { ChatRoomType } from 'src/entities/concrete/chatRoomType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomType])],
  controllers: [ChatRoomTypesController],
  providers: [ChatRoomTypeService],
  exports: [TypeOrmModule, ChatRoomTypeService],
})
export class ChatRoomTypeModule {}
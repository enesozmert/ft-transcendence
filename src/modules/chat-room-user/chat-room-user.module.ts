import { ChatRoomService } from 'src/business/concrete/chat-room/chat-room.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomUserService } from 'src/business/concrete/chat-room-user/chat-room-user.service';
import { ChatRoomUsersController } from 'src/controllers/chat-room-users/chat-room-users.controller';
import { ChatRoomUser } from 'src/entities/concrete/chatRoomUser.entity';
import { ChatRoomDal } from 'src/dataAccess/concrete/chatRoomDal';
import { ChatRoom } from 'src/entities/concrete/chatRoom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomUser]), TypeOrmModule.forFeature([ChatRoom])],
  controllers: [ChatRoomUsersController],
  providers: [ChatRoomUserService, ChatRoomService, ChatRoomDal],
  exports: [TypeOrmModule, ChatRoomUserService, ChatRoomService, ChatRoomDal],
})
export class ChatRoomUserModule { }
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomUserService } from 'src/business/concrete/chat-room-user/chat-room-user.service';
import { ChatRoomUsersController } from 'src/controllers/chat-room-users/chat-room-users.controller';
import { ChatRoomUser } from 'src/entities/concrete/chatRoomUser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomUser])],
  controllers: [ChatRoomUsersController],
  providers: [ChatRoomUserService,],
  exports: [TypeOrmModule, ChatRoomUserService],
})
export class ChatRoomUserModule {}
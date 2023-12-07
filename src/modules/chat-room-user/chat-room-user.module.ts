import { ChatRoomService } from 'src/business/concrete/chat-room/chat-room.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomUserService } from 'src/business/concrete/chat-room-user/chat-room-user.service';
import { ChatRoomUsersController } from 'src/controllers/chat-room-users/chat-room-users.controller';
import { ChatRoomUser } from 'src/entities/concrete/chatRoomUser.entity';
import { ChatRoomDal } from 'src/dataAccess/concrete/chatRoomDal';
import { ChatRoom } from 'src/entities/concrete/chatRoom.entity';
import { OperationClaimDal } from 'src/dataAccess/concrete/operationClaimDal';
import { OperationClaim } from 'src/core/entities/concrete/operationClaim.entity';
import { UserService } from 'src/business/concrete/user/user.service';
import { UserDal } from 'src/dataAccess/concrete/userDal';
import { User } from 'src/entities/concrete/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomUser]), TypeOrmModule.forFeature([ChatRoom]), TypeOrmModule.forFeature([OperationClaim]), TypeOrmModule.forFeature([User])],
  controllers: [ChatRoomUsersController],
  providers: [ChatRoomUserService, ChatRoomService, ChatRoomDal, OperationClaimDal, UserService, UserDal],
  exports: [TypeOrmModule, ChatRoomUserService, ChatRoomService, ChatRoomDal, UserService],
})
export class ChatRoomUserModule { }
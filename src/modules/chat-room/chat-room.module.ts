import { UserService } from './../../business/concrete/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomService } from 'src/business/concrete/chat-room/chat-room.service';
import { ChatRoomsController } from 'src/controllers/chat-rooms/chat-rooms.controller';
import { ChatRoom } from 'src/entities/concrete/chatRoom.entity';
import { OperationClaimDal } from 'src/dataAccess/concrete/operationClaimDal';
import { OperationClaim } from 'src/core/entities/concrete/operationClaim.entity';
import { User } from 'src/entities/concrete/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom]), TypeOrmModule.forFeature([OperationClaim]), TypeOrmModule.forFeature([User])],
  controllers: [ChatRoomsController],
  providers: [ChatRoomService, OperationClaimDal, UserService],
  exports: [TypeOrmModule, UserService],
})
export class ChatRoomModule { }
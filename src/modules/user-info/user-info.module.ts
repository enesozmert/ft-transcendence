import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomTypeService } from 'src/business/concrete/chat-room-type/chat-room-type.service';
import { UserInfoService } from 'src/business/concrete/user-info/user-info.service';
import { ChatRoomTypesController } from 'src/controllers/chat-room-types/chat-room-types.controller';
import { UserInfosController } from 'src/controllers/user-infos/user-infos.controller';
import { ChatRoomType } from 'src/entities/concrete/chatRoomType.entity';
import { UserInfo } from 'src/entities/concrete/userInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  controllers: [UserInfosController],
  providers: [UserInfoService],
  exports: [TypeOrmModule, UserInfoService],
})
export class UserInfoModule {}
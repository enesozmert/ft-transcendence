import { UserModule } from './../user/user.module';
import { UserService } from './../../business/concrete/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomTypeService } from 'src/business/concrete/chat-room-type/chat-room-type.service';
import { UserInfoService } from 'src/business/concrete/user-info/user-info.service';
import { ChatRoomTypesController } from 'src/controllers/chat-room-types/chat-room-types.controller';
import { UserInfosController } from 'src/controllers/user-infos/user-infos.controller';
import { ChatRoomType } from 'src/entities/concrete/chatRoomType.entity';
import { UserInfo } from 'src/entities/concrete/userInfo.entity';
import { MulterModule } from '@nestjs/platform-express';
import { FormFileImageSave } from 'src/core/utilities/file/concrete/formFileImageSave';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo]), UserModule, MulterModule.register({
    dest: './uploads/profile-images',
  }),],
  controllers: [UserInfosController],
  providers: [UserInfoService, UserService, FormFileImageSave],
  exports: [TypeOrmModule, UserInfoService, UserService],
})
export class UserInfoModule { }
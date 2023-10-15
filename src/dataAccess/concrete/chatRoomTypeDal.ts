import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChatRoomType } from 'src/entities/concrete/chatRoomType.entity';

@Injectable()
export class ChatRoomTypeDal extends Repository<ChatRoomType> {

}
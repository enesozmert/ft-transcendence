import { Injectable } from '@nestjs/common';
import { ChatRoom } from 'src/entities/concrete/chatRoom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatRoomDal extends Repository<ChatRoom> {

}
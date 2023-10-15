import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChatRoomUser } from 'src/entities/concrete/chatRoomUser.entity';

@Injectable()
export class ChatRoomUserDal extends Repository<ChatRoomUser> {

}
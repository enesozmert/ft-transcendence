import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChatRoomUserProperty } from 'src/entities/concrete/chatRoomUserProperty.entity';

@Injectable()
export class ChatRoomUserPropertyDal extends Repository<ChatRoomUserProperty> {

}
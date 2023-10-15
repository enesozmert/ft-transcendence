import { ChatRoomProperty } from '../../entities/concrete/chatRoomProperty.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ChatRoomPropertyDal extends Repository<ChatRoomProperty> {

}
import { Injectable } from '@nestjs/common';
import { ChatRoom } from 'src/entities/concrete/chatRoom.entity';
import { User } from 'src/entities/concrete/user.entity';
import { ChatRoomByUserDto } from 'src/entities/dto/chatRoomByUserDto';
import { Repository } from 'typeorm';

@Injectable()
export class ChatRoomDal extends Repository<ChatRoom> {
    
}
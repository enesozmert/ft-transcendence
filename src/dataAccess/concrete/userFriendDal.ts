import { Injectable } from '@nestjs/common';
import { UserFriend } from 'src/entities/concrete/userFriends.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserFriendDal extends Repository<UserFriend> {
}

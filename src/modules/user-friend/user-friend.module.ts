import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFriendService } from 'src/business/concrete/user-friend/user-friend.service';
import { UserFriendsController } from 'src/controllers/user-friends/user-friends.controller';
import { UserFriend } from 'src/entities/concrete/userFriends.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserFriend])],
  controllers: [UserFriendsController],
  providers: [UserFriendService],
  exports: [TypeOrmModule, UserFriendService],
})
export class UserFriendModule {}

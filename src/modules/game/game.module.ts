import { UserModule } from './../user/user.module';
import { GameService } from 'src/business/concrete/game/game.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/business/concrete/user/user.service';
import { GamesController } from 'src/controllers/games/games.controller';
import { UserDal } from 'src/dataAccess/concrete/userDal';

@Module({
  imports: [UserModule],
  exports: [GameService],
  controllers: [GamesController],
  providers: [GameService],
})
export class GameModule {}

import { UserDal } from 'src/dataAccess/concrete/userDal';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameHistoryDal } from 'src/dataAccess/concrete/gameHistoryDal';
import { GameHistoryService } from 'src/business/concrete/game-history/game-history.service';
import { GameHistoriesController } from 'src/controllers/game-histories/game-histories.controller';
import { GameHistory } from 'src/entities/concrete/gameHistory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameHistory]),
  ],
  exports: [TypeOrmModule, GameHistoryService],
  controllers: [GameHistoriesController],
  providers: [GameHistoryService, GameHistoryDal],
})
export class GameHistoryModule {}

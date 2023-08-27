import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameScore } from 'src/entities/concrete/gameScore.entity';
import { GameScoreService } from 'src/business/concrete/game-score/game-score.service';
import { GameHistoriesController } from 'src/controllers/game-histories/game-histories.controller';
import { GameScoreDal } from 'src/dataAccess/concrete/gameScoreDal';
import { GameScoriesController } from 'src/controllers/game-scories/game-scories.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameScore]),
  ],
  exports: [TypeOrmModule, GameScoreService],
  controllers: [GameScoriesController],
  providers: [GameScoreService, GameScoreDal],
})
export class GameScoreModule {}

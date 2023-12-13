import { UserModule } from './../user/user.module';
import { UserService } from './../../business/concrete/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameTotalScoriesController } from 'src/controllers/game-total-scories/game-total-scories.controller';
import { GameTotalScoreService } from 'src/business/concrete/game-total-score/game-total-score.service';
import { GameTotalScore } from 'src/entities/concrete/gameTotalScore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameTotalScore]), UserModule],
  controllers: [GameTotalScoriesController],
  providers: [GameTotalScoreService, UserService],
  exports: [TypeOrmModule, GameTotalScoreService, UserService],
})
export class GameTotalScoreModule { }
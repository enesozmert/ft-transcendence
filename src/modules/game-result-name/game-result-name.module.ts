import { UserDal } from 'src/dataAccess/concrete/userDal';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameResultName } from 'src/entities/concrete/gameResultName.entity';
import { GameResultNameService } from 'src/business/concrete/game-result-name/game-result-name.service';
import { GameHistoriesController } from 'src/controllers/game-histories/game-histories.controller';
import { GameResultNameDal } from 'src/dataAccess/concrete/gameResultNameDal';
import { GameResultNamesController } from 'src/controllers/game-result-names/game-result-names.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameResultName]),
  ],
  exports: [TypeOrmModule, GameResultNameService],
  controllers: [GameResultNamesController],
  providers: [GameResultNameService, GameResultNameDal],
})
export class GameResultNameModule {}

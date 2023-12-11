import { Repository } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { GameTotalScore } from 'src/entities/concrete/gameTotalScore.entity';

@Injectable()
export class GameTotalScoreDal extends Repository<GameTotalScore> {

}
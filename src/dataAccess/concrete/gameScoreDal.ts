import { Repository } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { GameScore } from 'src/entities/concrete/gameScore.entity';

@Injectable()
export class GameScoreDal extends Repository<GameScore> {

}
import { Repository } from 'typeorm';
import { GameResultName } from './../../entities/concrete/gameResultName.entity';
import { Injectable } from "@nestjs/common";

@Injectable()
export class GameResultNameDal extends Repository<GameResultName>{
}
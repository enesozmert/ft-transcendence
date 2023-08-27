import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GameHistory } from './../../entities/concrete/gameHistory.entity';

@Injectable()
export class GameHistoryDal extends Repository<GameHistory> {

}
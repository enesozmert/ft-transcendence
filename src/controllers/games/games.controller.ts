import { Controller } from '@nestjs/common';
import { GameService } from 'src/business/concrete/game/game.service';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';

@Controller('api/games')
export class GamesController {
    constructor(private gameService: GameService) { }

    public async add(): Promise<IDataResult<any>> {
		return new SuccessDataResult<any>("", "");
	}
}

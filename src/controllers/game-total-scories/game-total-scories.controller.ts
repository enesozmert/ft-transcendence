import { Request, Response } from 'express';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { GameTotalScoreService } from 'src/business/concrete/game-total-score/game-total-score.service';
import { GameTotalScore } from 'src/entities/concrete/gameTotalScore.entity';

@Controller('api/game-total-scories')
export class GameTotalScoriesController {
    constructor(private gameTotalScoreService: GameTotalScoreService) { }
    @Get('/getall')
    async getAll(@Res() response: Response, @Req() request: Request) {
        const result = await this.gameTotalScoreService.getAll();
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyid')
    async getById(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.query);
        const result = await this.gameTotalScoreService.getById(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/update')
    async update(@Res() response: Response, @Req() request: Request) {
      let gameTotalScore: GameTotalScore = request.body;
      const result = await this.gameTotalScoreService.update(gameTotalScore);
      
      if (result.success) {
        return response.status(HttpStatus.OK).send(await result);
      }
      return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
  
    @Get('/delete')
    async delete(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.params);
        const result = await this.gameTotalScoreService.delete(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/add')
    async add(@Res() response: Response, @Req() request: Request) {
        let gameTotalScore: GameTotalScore = request.body;
        const result = await this.gameTotalScoreService.add(gameTotalScore);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbynickname')
    async getByNickName(@Res() response: Response, @Req() request: Request) {
      let userNickName: string = String(request.query.nickname);
      const result = await this.gameTotalScoreService.getByNickName(userNickName);
  
      if (result.success) {
        return response.status(HttpStatus.OK).send(await result);
      }
      return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getwithuserdtos')
    async getWithUserDtos(@Res() response: Response, @Req() request: Request) {
        const result = await this.gameTotalScoreService.getWithUserDtos();
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

}

import { GameScoreService } from 'src/business/concrete/game-score/game-score.service';
import { Request, Response } from 'express';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { GameScore } from 'src/entities/concrete/gameScore.entity';

@Controller('api/game-scories')
export class GameScoriesController {
    constructor(private gameScoreService: GameScoreService) { }

    @Get('/getall')
    async getAll(@Res() response: Response, @Req() request: Request) {
        const result = await this.gameScoreService.getAll();
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyid')
    async getById(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.query);
        const result = await this.gameScoreService.getById(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/update')
    async update(@Res() response: Response, @Req() request: Request) {
      let gameScore: GameScore = request.body;
      const result = await this.gameScoreService.update(gameScore);
      
      if (result.success) {
        return response.status(HttpStatus.OK).send(await result);
      }
      return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
  
    @Get('/delete')
    async delete(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.params);
        const result = await this.gameScoreService.delete(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/add')
    async add(@Res() response: Response, @Req() request: Request) {
        let gameScore: GameScore = request.body;
        const result = await this.gameScoreService.add(gameScore);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    // @Get('/getbyuseridgamehistorydto')
    // async getByUserIdGameHistoryDto(@Res() response: Response, @Req() request: Request) {
    //     let userId: number = Number(request.query.userId);
    //     const result = await this.gameScoreService.getBy(userId);
        
    //     if (result.success) {
    //       return response.status(HttpStatus.OK).send(await result);
    //     }
    //     return response.status(HttpStatus.BAD_REQUEST).send(await result);
    // }
}

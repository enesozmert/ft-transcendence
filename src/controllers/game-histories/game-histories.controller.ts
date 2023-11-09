import { GameHistory } from '../../entities/concrete/gameHistory.entity';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { GameHistoryService } from 'src/business/concrete/game-history/game-history.service';
import { Request, Response } from 'express';

@Controller('api/game-histories')
export class GameHistoriesController {

    constructor(private gameHistoryService: GameHistoryService) { }

    @Get('/getall')
    async getAll(@Res() response: Response, @Req() request: Request) {
        const result = await this.gameHistoryService.getAll();
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyid')
    async getById(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.query);
        const result = await this.gameHistoryService.getById(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/update')
    async update(@Res() response: Response, @Req() request: Request) {
      let gameHistory: GameHistory = request.body;
      const result = await this.gameHistoryService.update(gameHistory);
      
      if (result.success) {
        return response.status(HttpStatus.OK).send(await result);
      }
      return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
  
    @Get('/delete')
    async delete(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.params);
        const result = await this.gameHistoryService.delete(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/add')
    async add(@Res() response: Response, @Req() request: Request) {
        let gameHistory: GameHistory = request.body;
        const result = await this.gameHistoryService.add(gameHistory);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyuserid')
    async getByUserId(@Res() response: Response, @Req() request: Request) {
        let userId: number = Number(request.query.userId);
        const result = await this.gameHistoryService.getByUserId(userId);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyuseridgamehistorydto')
    async getByUserIdGameHistoryDto(@Res() response: Response, @Req() request: Request) {
        let userId: number = Number(request.query.userId);
        const result = await this.gameHistoryService.getByUserIdGameHistoryDto(userId);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
}

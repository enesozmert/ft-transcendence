import { TwoFatypeService } from 'src/business/concrete/two-fatype/two-fatype.service';
import { Request, Response } from 'express';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { TwoFAType } from 'src/entities/concrete/towFAType.entity';

@Controller('api/two-fatypes')
export class TwoFatypesController {
    constructor(private twoFatypeService: TwoFatypeService) { }

    @Get('/getall')
    async getAll(@Res() response: Response, @Req() request: Request) {
        const result = await this.twoFatypeService.getAll();
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyid')
    async getById(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.query);
        const result = await this.twoFatypeService.getById(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/update')
    async update(@Res() response: Response, @Req() request: Request) {
      let twoFAType: TwoFAType = request.body;
      const result = await this.twoFatypeService.update(twoFAType);
      
      if (result.success) {
        return response.status(HttpStatus.OK).send(await result);
      }
      return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
  
    @Get('/delete')
    async delete(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.params);
        const result = await this.twoFatypeService.delete(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/add')
    async add(@Res() response: Response, @Req() request: Request) {
        let gameScore: TwoFAType = request.body;
        const result = await this.twoFatypeService.add(gameScore);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
}

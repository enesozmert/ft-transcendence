import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { DirectMessageService } from 'src/business/concrete/direct-message/direct-message.service';
import { DirectMessage } from 'src/entities/concrete/directMessage.entity';
import { Request, Response } from 'express';

@Controller('api/direct-messages')
export class DirectMessagesController {
    constructor(private directMessageService: DirectMessageService) { }

    @Get('/getall')
    async getAll(@Res() response: Response, @Req() request: Request) {
        const result = await this.directMessageService.getAll();
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyid')
    async getById(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.query);
        const result = await this.directMessageService.getById(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/update')
    async update(@Res() response: Response, @Req() request: Request) {
      let directMessage: DirectMessage = request.body;
      const result = await this.directMessageService.update(directMessage);
      
      if (result.success) {
        return response.status(HttpStatus.OK).send(await result);
      }
      return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
  
    @Get('/delete')
    async delete(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.params);
        const result = await this.directMessageService.delete(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/add')
    async add(@Res() response: Response, @Req() request: Request) {
        let directMessage: DirectMessage = request.body;
        const result = await this.directMessageService.add(directMessage);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/addall')
    async addAll(@Res() response: Response, @Req() request: Request) {
        let directMessage: DirectMessage[] = request.body;
        const result = await this.directMessageService.addAll(directMessage);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getallbyuserid')
    async getAllByUserId(@Res() response: Response, @Req() request: Request) {
        let userId: number = Number(request.query.userId);
        const result = await this.directMessageService.getAllByUserId(userId);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
}

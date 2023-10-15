import { ChatRoomUserPropertyService } from 'src/business/concrete/chat-room-user-property/chat-room-user-property.service';
import { ChatRoomUserProperty } from 'src/entities/concrete/chatRoomUserProperty.entity';
import { Request, Response } from 'express';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';

@Controller('api/chat-room-user-properties')
export class ChatRoomUserPropertiesController {

    constructor(private chatRoomUserPropertyService: ChatRoomUserPropertyService) { }

    @Get('/getall')
    async getAll(@Res() response: Response, @Req() request: Request) {
        const result = await this.chatRoomUserPropertyService.getAll();
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyid')
    async getById(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.query);
        const result = await this.chatRoomUserPropertyService.getById(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/update')
    async update(@Res() response: Response, @Req() request: Request) {
      let chatRoomUserProperty: ChatRoomUserProperty = request.body;
      const result = await this.chatRoomUserPropertyService.update(chatRoomUserProperty);
      
      if (result.success) {
        return response.status(HttpStatus.OK).send(await result);
      }
      return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
  
    @Get('/delete')
    async delete(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.params);
        const result = await this.chatRoomUserPropertyService.delete(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/add')
    async add(@Res() response: Response, @Req() request: Request) {
        let chatRoomUserProperty: ChatRoomUserProperty = request.body;
        const result = await this.chatRoomUserPropertyService.add(chatRoomUserProperty);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
}

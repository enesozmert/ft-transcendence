import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ChatRoomService } from 'src/business/concrete/chat-room/chat-room.service';
import { ChatRoom } from 'src/entities/concrete/chatRoom.entity';

@Controller('api/chat-rooms')
export class ChatRoomsController {
    constructor(private chatRoomService: ChatRoomService) { }

    @Get('/getall')
    async getAll(@Res() response: Response, @Req() request: Request) {
        const result = await this.chatRoomService.getAll();
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyid')
    async getById(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.query.id);
        const result = await this.chatRoomService.getById(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/update')
    async update(@Res() response: Response, @Req() request: Request) {
      let chatRoom: ChatRoom = request.body;
      const result = await this.chatRoomService.update(chatRoom);
      
      if (result.success) {
        return response.status(HttpStatus.OK).send(await result);
      }
      return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
  
    @Get('/delete')
    async delete(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.params);
        const result = await this.chatRoomService.delete(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/add')
    async add(@Res() response: Response, @Req() request: Request) {
        let chatRoom: ChatRoom = request.body;
        const result = await this.chatRoomService.add(chatRoom);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getroomsbyuserdto')
    async getRoomsByUserDto(@Res() response: Response, @Req() request: Request) {
        const result = await this.chatRoomService.getRoomsByUserDto();
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyaccessid')
    async getByAccessId(@Res() response: Response, @Req() request: Request) {
        let accessId: string = String(request.query.accessId);
        const result = await this.chatRoomService.getByAccessId(accessId);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
}

import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserFriendService } from 'src/business/concrete/user-friend/user-friend.service';
import { UserFriend } from 'src/entities/concrete/userFriends.entity';

@Controller('api/user-friends')
export class UserFriendsController {
    constructor(private userFriendService: UserFriendService) { }

    @Get('/getall')
    async getAll(@Res() response: Response, @Req() request: Request) {
        const result = await this.userFriendService.getAll();
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyid')
    async getById(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.query);
        const result = await this.userFriendService.getById(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/update')
    async update(@Res() response: Response, @Req() request: Request) {
      let userFriend: UserFriend = request.body;
      const result = await this.userFriendService.update(userFriend);
      
      if (result.success) {
        return response.status(HttpStatus.OK).send(await result);
      }
      return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
  
    @Get('/delete')
    async delete(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.query.id);
        const result = await this.userFriendService.delete(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/add')
    async add(@Res() response: Response, @Req() request: Request) {
        let userFriend: UserFriend = request.body;
        const result = await this.userFriendService.add(userFriend);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/getbyfromuseridandtargetuserid')
    async getByFromUserIdAndTargetUserId(@Res() response: Response, @Req() request: Request) {
      let userBlock: UserFriend = request.body;
      const result = await this.userFriendService.getByFromUserIdAndTargetUserId(userBlock);

      if (result.success) {
        return response.status(HttpStatus.OK).send(await result);
      }
      return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
}

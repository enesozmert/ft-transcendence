import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { log } from 'console';
import { Request, Response } from 'express';
import { UserBlockService } from 'src/business/concrete/user-block/user-block.service';
import { UserBlock } from 'src/entities/concrete/userBlock.entity';

@Controller('api/user-blocks')
export class UserBlocksController {
    constructor(private userBlockService: UserBlockService) {
        
    }

    @Get('/getall')
  async getAll(@Res() response: Response, @Req() request: Request) {
    const result = await this.userBlockService.getAll();

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }

  @Get('/getbyid')
  async getById(@Res() response: Response, @Req() request: Request) {
    let id: number = Number(request.query);
    const result = await this.userBlockService.getById(id);

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }

  @Post('/update')
  async update(@Res() response: Response, @Req() request: Request) {
    let userBlock: UserBlock = request.body;
    const result = await this.userBlockService.update(userBlock);

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }

  @Get('/delete')
  async delete(@Res() response: Response, @Req() request: Request) {
    let id: number = Number(request.query.id);
    const result = await this.userBlockService.delete(id);

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }

  @Post('/add')
  async add(@Res() response: Response, @Req() request: Request) {
    let userBlock: UserBlock = request.body;
    const result = await this.userBlockService.add(userBlock);

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }

  @Get('/getbyblockerid')
  async getByBlockerId(@Res() response: Response, @Req() request: Request) {
    let blockerId: number = Number(request.query.blockerId);
    const result = await this.userBlockService.getByBlockerId(blockerId);

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }
  @Post('/getbyblockeridblockedid')
  async updateStatusByBlockerIdBlockedId(@Res() response: Response, @Req() request: Request) {
    let userBlock: UserBlock = request.body;
    const result = await this.userBlockService.getByBlockerIdBlockedId(userBlock);

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }
}

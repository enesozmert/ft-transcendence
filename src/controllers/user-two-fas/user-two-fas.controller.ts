import { Request, Response } from 'express';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { UserTwoFaService } from 'src/business/concrete/user-two-fa/user-two-fa.service';
import { UserTwoFA } from 'src/entities/concrete/userTwoFa.entity';

@Controller('api/user-two-fas')
export class UserTwoFasController {
    constructor(private userTwoFaService: UserTwoFaService) { }

    @Get('/getall')
    async getAll(@Res() response: Response, @Req() request: Request) {
        const result = await this.userTwoFaService.getAll();
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyid')
    async getById(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.query);
        const result = await this.userTwoFaService.getById(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/update')
    async update(@Res() response: Response, @Req() request: Request) {
      let userTwoFa: UserTwoFA = request.body;
      const result = await this.userTwoFaService.update(userTwoFa);
      
      if (result.success) {
        return response.status(HttpStatus.OK).send(await result);
      }
      return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
  
    @Get('/delete')
    async delete(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.params);
        const result = await this.userTwoFaService.delete(id);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/add')
    async add(@Res() response: Response, @Req() request: Request) {
        let userTwoFa: UserTwoFA = request.body;
        const result = await this.userTwoFaService.add(userTwoFa);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyuserid')
    async getByUserId(@Res() response: Response, @Req() request: Request) {
        let userId: number = Number(request.query.userId);
        const result = await this.userTwoFaService.getByUserId(userId);
        
        if (result.success) {
          return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
}

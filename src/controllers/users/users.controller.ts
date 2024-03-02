import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from 'src/business/concrete/user/user.service';
import { Request, Response } from 'express';
import { User } from 'src/entities/concrete/user.entity';
import { UserForSearchDto } from 'src/entities/dto/userForSearchDto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  // @common.Post()
  // create(@common.Body() user: User) {
  //   return this.usersService.create(user);
  // }

  @Get('/getall')
  async getAll() {
    const result = this.usersService.getAll();
    if ((await result).success) return result;
    throw new BadRequestException(result);
  }

  @Get('/getbyid')
  async getById(@Query('id') id: string) {
    return this.usersService.getById(+id);
  }

  @Get('/getbynickname')
  async getByNickName(@Res() response: Response, @Req() request: Request) {
    let userNickName: string = String(request.query.nickname);
    const result = await this.usersService.getByNickName(userNickName);

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }

  @Get('/getbymail')
  async getByMail(@Res() response: Response, @Req() request: Request) {
    let userMail: string = String(request.query.email);
    const result = await this.usersService.getByMail(userMail);

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }


  @Post('/update')
  async update(@Res() response: Response, @Req() request: Request) {
    const user: User = request.body;
    const result = await this.usersService.update(user);

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }

  @Post('/delete')
  delete(@Query('id') id: string) {
    return this.usersService.delete(+id);
  }
}

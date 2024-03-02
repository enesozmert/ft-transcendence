import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserInfoService } from 'src/business/concrete/user-info/user-info.service';
import { GenerateGuid } from 'src/core/utilities/guid/generateGuid';
import { UserInfo } from 'src/entities/concrete/userInfo.entity';
import { UserForSearchDto } from 'src/entities/dto/userForSearchDto';

@Controller('api/user-infos')
export class UserInfosController {
  constructor(private userInfoService: UserInfoService) { }

  @Get('/getall')
  async getAll(@Res() response: Response, @Req() request: Request) {
    const result = await this.userInfoService.getAll();

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }

  @Get('/getbyid')
  async getById(@Res() response: Response, @Req() request: Request) {
    let id: number = Number(request.query);
    const result = await this.userInfoService.getById(id);

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }

  @Post('/update')
  async update(@Res() response: Response, @Req() request: Request) {
    let userInfo: UserInfo = request.body;
    const result = await this.userInfoService.update(userInfo);

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }

  @Get('/delete')
  async delete(@Res() response: Response, @Req() request: Request) {
    let id: number = Number(request.params);
    const result = await this.userInfoService.delete(id);

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }

  @Post('/add')
  async add(@Res() response: Response, @Req() request: Request) {
    let userInfo: UserInfo = request.body;
    const result = await this.userInfoService.add(userInfo);

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }

  @Get('/getbynickname')
  async getByNickName(@Res() response: Response, @Req() request: Request) {
    let userNickName: string = String(request.query.nickname);
    const result = await this.userInfoService.getByNickName(userNickName);

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }

  @Post('uploadprofileimage')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/profile-images',
      filename: (req, file, callback) => {
        const randomName = GenerateGuid();
        return callback(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadImage(@Res() response: Response, @Req() request: Request,
    @UploadedFile() file: Express.Multer.File) {
    const nickname = request.body.nickname;
    if (!nickname) {
      return response.status(HttpStatus.BAD_REQUEST).send('nickname is required.');
    }
    const result = await this.userInfoService.uploadProfileImage(nickname, file);

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }
  
  @Post('/getbyattributes')
  async getByAttributes(@Res() response: Response, @Req() request: Request) {
    const user: UserForSearchDto = request.body;
    const result = await this.userInfoService.getByAttributes(user);

    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }

}

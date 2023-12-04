import { ChatRoomForRegisterDto } from './../../entities/dto/chatRoomForRegisterDto';
import {
    BadRequestException,
    Body,
    Controller,
    HttpStatus,
    Post,
    Req,
    Res,
  } from '@nestjs/common';
  import { AuthService } from 'src/business/concrete/auth/auth.service';
  import { UserForLoginDto } from 'src/entities/dto/userForLoginDto';
  import { UserForRegisterDto } from 'src/entities/dto/userForRegisterDto';
  import { Request, Response } from 'express';
import { ChatRoomForLoginDto } from 'src/entities/dto/chatRoomForLoginDto';
import { ChatRoomAuthService } from 'src/business/concrete/chat-room-auth/chat-room-auth.service';
  

@Controller('chat-room-auth')
export class ChatRoomAuthController {
    constructor(private readonly chatRoomAuthService: ChatRoomAuthService) {}

    @Post('login')
    async login(@Res() response: Response, @Req() request: Request) {
      const chatRoomLoginDto: ChatRoomForLoginDto = {
        accessId: request.body.accessId,
        password: request.body.password,
      };
      const userToLogin = await this.chatRoomAuthService.login(chatRoomLoginDto);
      if (!userToLogin.success) {
        return response.status(HttpStatus.BAD_REQUEST).send(await userToLogin);
      }
  
    //   const result = await this.chatRoomAuthService.createAccessToken(userToLogin.data);
      if (userToLogin.success) {
        return response.status(HttpStatus.OK).send(userToLogin);
      }
      return response.status(HttpStatus.BAD_REQUEST).send(await userToLogin);
    }
  
    @Post('register')
    async register(@Res() response: Response, @Req() request: Request) {
        const chatRoomForRegisterDto = request.body;
    //   const userForRegisterDto: UserForRegisterDto = {
    //     email: request.body.email,
    //     password: request.body.password,
    //     firstName: request.body.firstName,
    //     lastName: request.body.lastName,
    //     nickName: request.body.nickName,
    //   };
    //   const userExists = this.authService.userExists(userForRegisterDto);
    //   if (!(await userExists).success) {
    //     return response.status(HttpStatus.BAD_REQUEST).send(await userExists);
    //   }
      const registerResult = this.chatRoomAuthService.register(
        chatRoomForRegisterDto,
        chatRoomForRegisterDto.password,
      );
    //   const result = this.chatRoomAuthService.createAccessToken(
    //     (await registerResult).data,
    //   );
      if ((await registerResult).success) {
        return response.status(HttpStatus.OK).send(await registerResult);
      }
      return response.status(HttpStatus.BAD_REQUEST).send(await registerResult);
    }
}

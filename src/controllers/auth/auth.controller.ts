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

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Res() response: Response, @Req() request: Request) {
    const userForLoginDto: UserForLoginDto = {
      email: request.body.email,
      password: request.body.password,
    };
    const userToLogin = await this.authService.login(userForLoginDto);
    if (!userToLogin.success) {
      return response.status(HttpStatus.BAD_REQUEST).send(await userToLogin);
    }

    const result = await this.authService.createAccessToken(userToLogin.data);
    if (result.success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }

  @Post('register')
  async register(@Res() response: Response, @Req() request: Request) {
    const userForRegisterDto: UserForRegisterDto = {
      email: request.body.email,
      password: request.body.password,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      nickName: request.body.nickName,
    };
    const userExists = this.authService.userExists(userForRegisterDto);
    if (!(await userExists).success) {
      return response.status(HttpStatus.BAD_REQUEST).send(await userExists);
    }
    const registerResult = this.authService.register(
      userForRegisterDto,
      userForRegisterDto.password,
    );
    const result = this.authService.createAccessToken(
      (await registerResult).data,
    );
    if ((await result).success) {
      return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }
}

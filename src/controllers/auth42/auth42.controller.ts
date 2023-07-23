import {
  Controller,
  Get,
  HttpStatus,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from 'src/business/concrete/auth/auth.service';
import { Auth42Service } from 'src/business/concrete/auth42/auth42.service';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
@Controller('api/auth42')
export class Auth42Controller {
  constructor(
    private readonly auth42Service: Auth42Service,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  // @Post('login')
  // async login(@Res() response: Response, @Req() request: Request) {
  //   const userForLoginDto: UserForLoginDto = {
  //     email: request.body.email,
  //     password: request.body.password,
  //   };
  //   const userToLogin = await this.auth42Service.login(userForLoginDto);
  //   if (!userToLogin.success) {
  //     return response.status(HttpStatus.BAD_REQUEST).send(await userToLogin);
  //   }

  //   const result = await this.authService.createAccessToken(userToLogin.data);
  //   if (result.success) {
  //     return response.status(HttpStatus.OK).send(await result);
  //   }
  //   return response.status(HttpStatus.BAD_REQUEST).send(await result);
  // }

  @Get('register')
  async register(@Res() response: Response, @Req() request: Request) {
    const code = String(request.query.code);
    const registerResult = this.auth42Service.register(code);
    const result = this.authService.createAccessToken(
      (await registerResult).data,
    );
    if ((await result).success) {
      return response.redirect(
        'http://localhost:4200/auth42/' + (await result).data.token,
      );
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }
}

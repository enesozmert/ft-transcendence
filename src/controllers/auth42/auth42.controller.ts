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
import { UserForLoginDto } from 'src/entities/dto/userForLoginDto';
@Controller('api/auth42')
export class Auth42Controller {
  constructor(
    private readonly auth42Service: Auth42Service,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('login')
  async login(@Res() response: Response, @Req() request: Request) {
    const code = String(request.query.code);
    const userToLogin = await this.auth42Service.login(code);
    if (!userToLogin.success) {
      return response.redirect(
        'http://localhost:4200/redirection-auth42/' + "none" + '/' + (await userToLogin).success + '/' + (await userToLogin).message,
      );
    }

    const result = await this.authService.createAccessToken(userToLogin.data);
    return response.redirect(
      'http://localhost:4200/redirection-auth42/' + (await result).data.token + '/' + (await result).success + '/' + (await result).message,
    );
  }

  @Get('register')
  async register(@Res() response: Response, @Req() request: Request) {
    const code = String(request.query.code);
    const registerResult = this.auth42Service.register(code);
    if (!(await registerResult).success){
      return response.redirect(
        'http://localhost:4200/redirection-auth42/' + "none" + '/' + (await registerResult).success + '/' + (await registerResult).message,
      );
    }

    const result = this.authService.createAccessToken(
      (await registerResult).data,
    );
    return response.redirect(
      'http://localhost:4200/redirection-auth42/' + (await result).data.token + '/' + (await result).success + '/' + (await result).message,
    );
  }
}

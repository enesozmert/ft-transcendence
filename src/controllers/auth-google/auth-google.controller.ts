import { Controller, Get, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGoogleService } from 'src/business/concrete/auth-google/auth-google.service';
import { AuthService } from 'src/business/concrete/auth/auth.service';
import { Request, Response } from 'express';

@Controller('api/auth-google')
export class AuthGoogleController {
    constructor(
        private readonly authGoogleService: AuthGoogleService,
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
      ) {}
    
      @Get('login')
      async login(@Res() response: Response, @Req() request: Request) {
        const code = String(request.query.code);
        const userToLogin = await this.authGoogleService.login(code);
        if (!userToLogin.success) {
          return response.redirect(
            'http://localhost:4200/redirection-auth-google/' + "none" + '/' + (await userToLogin).success + '/' + (await userToLogin).message,
          );
        }
    
        const result = await this.authService.createAccessToken(userToLogin.data);
        return response.redirect(
          'http://localhost:4200/redirection-auth-google/' + (await result).data.token + '/' + (await result).success + '/' + (await result).message,
        );
      }
    
      @Get('register')
      async register(@Res() response: Response, @Req() request: Request) {
        const code = String(request.query.code);
        const registerResult = this.authGoogleService.register(code);
        if (!(await registerResult).success){
          return response.redirect(
            'http://localhost:4200/redirection-auth-google/' + "none" + '/' + (await registerResult).success + '/' + (await registerResult).message,
          );
        }
    
        const result = this.authService.createAccessToken(
          (await registerResult).data,
        );
        return response.redirect(
          'http://localhost:4200/redirection-auth-google/' + (await result).data.token + '/' + (await result).success + '/' + (await result).message,
        );
      }
}

import { BadRequestException, Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from 'src/business/concrete/auth/auth.service';
import { UserForLoginDto } from 'src/entities/dto/userForLoginDto';
import { UserForRegisterDto } from 'src/entities/dto/userForRegisterDto';
import { Request, Response } from "express";
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Res() response: Response, @Req() request: Request, @Body() userForLoginDto: UserForLoginDto) {
    // let userForLoginDto: UserForLoginDto = 
    // {
    //   email : request.body.email,
    //   password : request.body.password
    // }
    const userToLogin = await this.authService.login(userForLoginDto);
    if (!userToLogin.success) {
      return(response.status(HttpStatus.BAD_REQUEST).send(userToLogin));
    }

    const result = await this.authService.createAccessToken(userToLogin.data);
    if (result.success) {
      return(response.status(HttpStatus.OK).send(result));
    }
    return(response.status(HttpStatus.BAD_REQUEST).send(result));
  }

  @Post('register')
  async register(@Res() response: Response) {
    let userForRegisterDto: UserForRegisterDto = 
    {
      email: "enes@enes.com",
      password: "123",
      firstName: "enes",
      lastName: "özmert",
      nickName: "eozmert1",
    }
    let userExists = this.authService.userExists(userForRegisterDto)
    if ((await userExists).success == false)
    {
      response.status(HttpStatus.BAD_REQUEST);
    }
    let registerResult = this.authService.register(userForRegisterDto, userForRegisterDto.password)
    let result = this.authService.createAccessToken((await registerResult).data)
    if ((await result).success)
    {
      response.status(HttpStatus.OK );
      return result;
    }
    response.status(HttpStatus.BAD_REQUEST);
  }
}

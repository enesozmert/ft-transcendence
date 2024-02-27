import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { TwoFaService } from 'src/business/concrete/two-fa/two-fa.service';
import { User } from 'src/entities/concrete/user.entity';

@Controller('api/two-fas')
export class TwoFasController {
  constructor(@Inject(TwoFaService) private twoFA: TwoFaService) {}

  @Post('generate')
  async generate(@Res() response: Response, @Req() request: Request) {
    const user: any = request.body;
    const result = await this.twoFA.genereate(user);
    if (result.success) {
        return response.status(HttpStatus.OK).send(await result);
      }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }

  @Get('verify')
  async verify(@Res() response: Response, @Req() request: Request) {
    const userSecret = request.query.userSecret;
    const token = String(request.query.token);
    const result = await this.twoFA.verify(userSecret, token);
    if (result.success) {
        return response.status(HttpStatus.OK).send(await result);
    }
    return response.status(HttpStatus.BAD_REQUEST).send(await result);
  }
}

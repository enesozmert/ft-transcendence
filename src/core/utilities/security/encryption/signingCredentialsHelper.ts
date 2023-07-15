import { Injectable } from '@nestjs/common';
import { JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class SigningCredentialsService {
  createSigningCredentials(secretKey: string): JwtSignOptions {
    return { secret: secretKey,  algorithm: 'HS256' };
  }
}

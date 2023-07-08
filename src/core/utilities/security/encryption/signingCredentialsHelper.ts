import { Injectable } from '@nestjs/common';

@Injectable()
export class SigningCredentialsService {
  createSigningCredentials(secretKey: string): any {
    return { secret: secretKey, signOptions: { algorithm: 'HS256' } };
  }
}

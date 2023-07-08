import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class SecurityKeyService {
  createSecurityKey(secret: string): crypto.KeyObject {
    return crypto.createSecretKey(Buffer.from(secret, 'utf8'));
  }
}

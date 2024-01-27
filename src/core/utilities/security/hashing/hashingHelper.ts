import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { SecurityKeyService } from '../encryption/securityKeyHelper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HashingHelper {
  constructor(
    private readonly securityKeyService: SecurityKeyService,
    private readonly jwtService: JwtService,
  ) {}

  async createPasswordHash(
    password: string,
  ): Promise<{ passwordHash: Buffer; passwordSalt: Buffer }> {
    const passwordSalt = crypto.randomBytes(password.length);
    const passwordHash = this.hashPassword(password, passwordSalt);
    return { passwordHash, passwordSalt };
  }

  async verifyPasswordHash(
    password: string,
    passwordHash: Buffer,
    passwordSalt: Buffer,
  ): Promise<boolean> {
    const hashedPassword = this.hashPassword(password, passwordSalt);

    if (hashedPassword.length !== passwordHash.length) {
      return false;
    }
  
    return crypto.timingSafeEqual(hashedPassword, passwordHash);
  }

  private hashPassword(password: string, salt: Buffer): Buffer {
    const hash = crypto
      .createHash('sha256')
      .update(password)
      .update(salt)
      .digest();
    return hash;
  }

  private signToken(payload: any): string {
    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  private verifyToken(token: string): any {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      return null;
    }
  }
}

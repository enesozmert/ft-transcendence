import { ConfigService } from "@nestjs/config";

export class TokenOptions {
  audience: string;
  issuer: string;
  accessTokenExpiration: number;
  securityKey: string;

  constructor(private readonly configService: ConfigService) {
    this.issuer = this.configService.get<string>('ISSUER');
    this.audience = this.configService.get<string>('AUDIENCE');
    this.accessTokenExpiration = this.configService.get<number>('ACCESS_TOKEN_EXPIRATION');
    this.securityKey = this.configService.get<string>('SECURITY_KEY');
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenOptions } from './tokenOptions';
import { User } from 'src/entities/concrete/user.entity';
import { OperationClaim } from 'src/core/entities/concrete/operationClaim.entity';
import { AccessToken } from './accessToken';
import { SecurityKeyService } from '../encryption/securityKeyHelper';
import { SigningCredentialsService } from '../encryption/signingCredentialsHelper';

@Injectable()
export class JwtHelper {
  private readonly tokenOptions: TokenOptions;
  private accessTokenExpiration: Date;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly securityKeyService: SecurityKeyService,
    private readonly signingCredentialsService: SigningCredentialsService,
  ) {
    this.tokenOptions = this.configService.get<TokenOptions>('TokenOptions');
  }

  createToken(user: User, operationClaims: OperationClaim[]): AccessToken {
    this.accessTokenExpiration = new Date();
    this.accessTokenExpiration.setMinutes(
      this.accessTokenExpiration.getMinutes() +
        this.tokenOptions.accessTokenExpiration,
    );

    const signingCredentials =
      this.signingCredentialsService.createSigningCredentials(
        this.tokenOptions.securityKey,
      );
    const jwt = this.createJwtSecurityToken(
      user,
      signingCredentials,
      operationClaims,
    );
    const token = this.jwtService.sign(jwt);

    return {
      token,
      expiration: this.accessTokenExpiration,
    };
  }

  private createJwtSecurityToken(
    user: User,
    signingCredentials: any,
    operationClaims: OperationClaim[],
  ): any {
    const jwtPayload = {
      issuer: this.tokenOptions.issuer,
      audience: this.tokenOptions.audience,
      expiresIn: this.accessTokenExpiration,
      notBefore: new Date(),
      subject: user.id.toString(),
      claims: this.setClaims(user, operationClaims),
    };

    const jwt: any = this.jwtService.sign(jwtPayload, signingCredentials);
    jwt.signingKey = signingCredentials.key;
    jwt.rawSignature = signingCredentials.signature;

    return jwt;
  }

  private setClaims(user: User, operationClaims: OperationClaim[]): any[] {
    const claims = [
      { name: 'nameIdentifier', value: user.id.toString() },
      { name: 'email', value: user.email },
      { name: 'name', value: `${user.firstname} ${user.lastname}` },
      ...operationClaims.map((claim) => ({
        name: 'roles',
        value: claim.name,
      })),
    ];

    return claims;
  }
}

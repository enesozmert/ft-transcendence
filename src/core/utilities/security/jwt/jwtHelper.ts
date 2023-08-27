import { Inject, Injectable } from '@nestjs/common';
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
    @Inject(ConfigService) private readonly configService: ConfigService,
    private readonly securityKeyService: SecurityKeyService,
    private readonly signingCredentialsService: SigningCredentialsService,
  ) {
    this.tokenOptions = new TokenOptions(this.configService);
  }

  createToken(user: User, operationClaims: OperationClaim[]): AccessToken {
    this.accessTokenExpiration = new Date();
    this.accessTokenExpiration.setMinutes(
      Number(this.accessTokenExpiration.getMinutes()) + Number(this.tokenOptions.accessTokenExpiration)
    );
    const signingCredentials = this.signingCredentialsService.createSigningCredentials(
      this.tokenOptions.securityKey,
    );
    const jwtPayload = this.createJwtPayload(user, operationClaims);    
    const token = this.jwtService.sign(jwtPayload,signingCredentials);
    return {
      token,
      expiration: this.accessTokenExpiration,
    };
  }
  
  private createJwtPayload(user: User, operationClaims: OperationClaim[]): any {
    return {
      issuer: this.tokenOptions.issuer,
      audience: this.tokenOptions.audience,
      expiresIn: this.accessTokenExpiration.getTime(),
      notBefore: new Date().getTime(),
      subject: user.id.toString(),
      claims: this.setClaims(user, operationClaims),
    };
  }
  
  private setClaims(user: User, operationClaims: OperationClaim[]): any[] {
    const claims = [
      { name: 'nameIdentifier', value: user.id.toString() },
      { name: 'email', value: user.email },
      { name: 'name', value: `${user.firstName} ${user.lastName}` },
      { name: 'nickName', value: `${user.nickName}` },
      { name: 'status', value: `${user.status}` },
      { name: 'isVerified', value: `${user.isVerified}` },
      ...operationClaims.map((claim) => ({
        name: 'roles',
        value: claim.name,
      })),
    ];
  
    return claims;
  }  
}

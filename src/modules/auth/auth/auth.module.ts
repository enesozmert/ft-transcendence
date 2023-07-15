import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/business/concrete/auth/auth.service';
import { UserService } from 'src/business/concrete/user/user.service';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { OperationClaim } from 'src/core/entities/concrete/operationClaim.entity';
import { SecurityKeyService } from 'src/core/utilities/security/encryption/securityKeyHelper';
import { SigningCredentialsService } from 'src/core/utilities/security/encryption/signingCredentialsHelper';
import { HashingHelper } from 'src/core/utilities/security/hashing/hashingHelper';
import { JwtHelper } from 'src/core/utilities/security/jwt/jwtHelper';
import { UserDal } from 'src/dataAccess/concrete/userDal';
import { User } from 'src/entities/concrete/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([OperationClaim]),
  ],
  exports: [TypeOrmModule, AuthService],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserDal,
    JwtHelper,
    HashingHelper,
    JwtService,
    ConfigService,
    SecurityKeyService,
    SigningCredentialsService,
  ],
})
export class AuthModule {}

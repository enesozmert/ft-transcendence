import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGoogleService } from 'src/business/concrete/auth-google/auth-google.service';
import { AuthService } from 'src/business/concrete/auth/auth.service';
import { Auth42Service } from 'src/business/concrete/auth42/auth42.service';
import { UserService } from 'src/business/concrete/user/user.service';
import { AuthGoogleController } from 'src/controllers/auth-google/auth-google.controller';
import { Auth42Controller } from 'src/controllers/auth42/auth42.controller';
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
  exports: [TypeOrmModule, AuthService, AuthGoogleService],
  controllers: [AuthGoogleController],
  providers: [
    AuthService,
    AuthGoogleService,
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
export class AuthGoogleModule {}
import { ChatRoomAuthController } from './../../controllers/chat-room-auth/chat-room-auth.controller';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/business/concrete/auth/auth.service';
import { ChatRoomAuthService } from 'src/business/concrete/chat-room-auth/chat-room-auth.service';
import { ChatRoomService } from 'src/business/concrete/chat-room/chat-room.service';
import { UserService } from 'src/business/concrete/user/user.service';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { OperationClaim } from 'src/core/entities/concrete/operationClaim.entity';
import { SecurityKeyService } from 'src/core/utilities/security/encryption/securityKeyHelper';
import { SigningCredentialsService } from 'src/core/utilities/security/encryption/signingCredentialsHelper';
import { HashingHelper } from 'src/core/utilities/security/hashing/hashingHelper';
import { JwtHelper } from 'src/core/utilities/security/jwt/jwtHelper';
import { OperationClaimDal } from 'src/dataAccess/concrete/operationClaimDal';
import { UserDal } from 'src/dataAccess/concrete/userDal';
import { ChatRoom } from 'src/entities/concrete/chatRoom.entity';
import { User } from 'src/entities/concrete/user.entity';
import { ChatRoomDal } from 'src/dataAccess/concrete/chatRoomDal';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatRoom]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([OperationClaim])
  ],
  exports: [TypeOrmModule, AuthService, UserService,ChatRoomDal, ChatRoomService, ChatRoomAuthService],
  controllers: [ChatRoomAuthController],
  providers: [
    AuthService,
    UserService,
    ChatRoomDal,
    ChatRoomService,
    ChatRoomAuthService,
    UserDal,
    JwtHelper,
    HashingHelper,
    JwtService,
    ConfigService,
    SecurityKeyService,
    SigningCredentialsService
  ],
})
export class ChatRoomAuthModule { }

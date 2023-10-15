import { DirectMessageMatchModule } from './modules/direct-message-match/direct-message-match.module';
import { ChatRoomUserPropertyModule } from './modules/chat-room-user-property/chat-room-user-property.module';
import { ChatRoomUserModule } from './modules/chat-room-user/chat-room-user.module';
import { ChatRoomTypeModule } from './modules/chat-room-type/chat-room-type.module';
import { ChatRoomPropertyModule } from './modules/chat-room-property/chat-room-property.module';
import { GameModule } from './modules/game/game.module';
import { GameResultNameModule } from './modules/game-result-name/game-result-name.module';
import { GameScoreModule } from './modules/game-score/game-score.module';
import { GameHistoryModule } from './modules/game-history/game-history.module';
import { AuthGoogleModule } from './modules/auth-google/auth-google.module';
import { Auth42Module } from './modules/auth42/auth42.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './core/helper/env.helper';
import { TypeOrmConfigService } from './dataAccess/typeorm.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth/auth.module';
import * as path from 'path';
import { ChatRoomModule } from './modules/chat-room/chat-room.module';

const envFilePath: string = getEnvPath(`${__dirname}/core/envs`);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath:envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UserModule,
    AuthModule,
    Auth42Module,
    AuthGoogleModule,
    GameHistoryModule,
    GameScoreModule,
    GameResultNameModule,
    GameModule,
    ChatRoomModule,
    ChatRoomPropertyModule,
    ChatRoomTypeModule,
    ChatRoomUserModule,
    ChatRoomUserPropertyModule,
    DirectMessageMatchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

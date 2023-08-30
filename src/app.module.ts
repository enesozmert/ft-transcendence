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
    GameModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

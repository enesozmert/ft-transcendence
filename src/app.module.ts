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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
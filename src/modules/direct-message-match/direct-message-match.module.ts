import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectMessageMatchService } from 'src/business/concrete/direct-message-match/direct-message-match.service';
import { DirectMessageMatchesController } from 'src/controllers/direct-message-matches/direct-message-matches.controller';
import { DirectMessageMatch } from 'src/entities/concrete/directMessageMatch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DirectMessageMatch])],
  controllers: [DirectMessageMatchesController],
  providers: [DirectMessageMatchService],
  exports: [TypeOrmModule, DirectMessageMatchService],
})
export class DirectMessageMatchModule {}
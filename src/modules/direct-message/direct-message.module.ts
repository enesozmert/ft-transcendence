import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectMessageService } from 'src/business/concrete/direct-message/direct-message.service';
import { DirectMessagesController } from 'src/controllers/direct-messages/direct-messages.controller';
import { DirectMessage } from 'src/entities/concrete/directMessage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DirectMessage])],
  controllers: [DirectMessagesController],
  providers: [DirectMessageService],
  exports: [TypeOrmModule, DirectMessageService],
})
export class DirectMessageModule {}
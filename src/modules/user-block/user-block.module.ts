import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBlockService } from 'src/business/concrete/user-block/user-block.service';
import { UserBlocksController } from 'src/controllers/user-blocks/user-blocks.controller';
import { UserBlockDal } from 'src/dataAccess/concrete/userBlockDal';
import { UserBlock } from 'src/entities/concrete/userBlock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserBlock]),
  ],
  exports: [TypeOrmModule, UserBlockService],
  controllers: [UserBlocksController],
  providers: [UserBlockService, UserBlockDal],
})
export class UserBlockModule {}

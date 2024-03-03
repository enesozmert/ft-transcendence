import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTwoFaService } from 'src/business/concrete/user-two-fa/user-two-fa.service';
import { UserTwoFasController } from 'src/controllers/user-two-fas/user-two-fas.controller';
import { UserTwoFADal } from 'src/dataAccess/concrete/userTwoFaDal';
import { UserTwoFA } from 'src/entities/concrete/userTwoFa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTwoFA]),
  ],
  exports: [TypeOrmModule, UserTwoFaService],
  controllers: [UserTwoFasController],
  providers: [UserTwoFaService, UserTwoFADal],
})
export class UserTwoFaModule {}

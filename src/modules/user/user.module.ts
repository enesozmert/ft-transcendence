import { UserDal } from 'src/dataAccess/concrete/userDal';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/business/concrete/user/user.service';
import { UsersController } from 'src/controllers/users/users.controller';
import { User } from 'src/entities/concrete/user.entity';
import { OperationClaimDal } from 'src/dataAccess/concrete/operationClaimDal';
import { OperationClaim } from 'src/core/entities/concrete/operationClaim.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([OperationClaim]),
  ],
  exports: [TypeOrmModule, UserService],
  controllers: [UsersController],
  providers: [UserService, UserDal, OperationClaimDal],
})
export class UserModule {}

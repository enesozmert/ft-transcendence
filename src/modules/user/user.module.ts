import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/business/concrete/user/user.service';
import { UsersController } from 'src/controllers/users/users.controller';
import { UserDal } from 'src/dataAccess/concrete/userDal';
import { User } from 'src/entities/concrete/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, UserService],
  controllers: [UsersController],
  providers: [UserService, UserDal],
})
export class UserModule {}

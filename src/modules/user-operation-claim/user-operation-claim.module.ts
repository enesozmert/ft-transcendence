import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOperationClaimService } from 'src/business/concrete/user-operation-claim/user-operation-claim.service';
import { UserOperationClaimsController } from 'src/controllers/user-operation-claims/user-operation-claims.controller';
import { UserOperationClaim } from 'src/core/entities/concrete/userOperationClaim.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOperationClaim])],
  controllers: [UserOperationClaimsController],
  providers: [UserOperationClaimService],
  exports: [TypeOrmModule, UserOperationClaimService],
})
export class UserOperationClaimModule {}
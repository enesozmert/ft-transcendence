import { OperationClaimService } from './../../business/concrete/operation-claim/operation-claim.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationClaimsController } from 'src/controllers/operation-claims/operation-claims.controller';
import { OperationClaim } from 'src/core/entities/concrete/operationClaim.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperationClaim])],
  controllers: [OperationClaimsController],
  providers: [OperationClaimService],
  exports: [TypeOrmModule, OperationClaimService],
})
export class OperationClaimModule {}
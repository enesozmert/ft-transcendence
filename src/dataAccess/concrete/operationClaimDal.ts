import { Injectable } from '@nestjs/common';
import { OperationClaim } from 'src/core/entities/concrete/operationClaim.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OperationClaimDal extends Repository<OperationClaim> {}

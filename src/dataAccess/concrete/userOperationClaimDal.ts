import { Injectable } from '@nestjs/common';
import { UserOperationClaim } from 'src/core/entities/concrete/userOperationClaim.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserOperationClaimDal extends Repository<UserOperationClaim> {}

import { Test, TestingModule } from '@nestjs/testing';
import { UserOperationClaimService } from './user-operation-claim.service';

describe('UserOperationClaimService', () => {
  let service: UserOperationClaimService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserOperationClaimService],
    }).compile();

    service = module.get<UserOperationClaimService>(UserOperationClaimService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { OperationClaimService } from './operation-claim.service';

describe('OperationClaimService', () => {
  let service: OperationClaimService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationClaimService],
    }).compile();

    service = module.get<OperationClaimService>(OperationClaimService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

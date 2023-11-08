import { Test, TestingModule } from '@nestjs/testing';
import { OperationClaimsController } from './operation-claims.controller';

describe('OperationClaimsController', () => {
  let controller: OperationClaimsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperationClaimsController],
    }).compile();

    controller = module.get<OperationClaimsController>(OperationClaimsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

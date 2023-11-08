import { Test, TestingModule } from '@nestjs/testing';
import { UserOperationClaimsController } from './user-operation-claims.controller';

describe('UserOperationClaimsController', () => {
  let controller: UserOperationClaimsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserOperationClaimsController],
    }).compile();

    controller = module.get<UserOperationClaimsController>(UserOperationClaimsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

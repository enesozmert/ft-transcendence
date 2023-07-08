import { User } from 'src/entities/concrete/user.entity';
import { AccessToken } from './accessToken';
import { OperationClaim } from 'src/core/entities/concrete/operationClaim';

export interface ITokenHelper {
  createToken(user: User, operationClaims: OperationClaim[]): AccessToken;
}

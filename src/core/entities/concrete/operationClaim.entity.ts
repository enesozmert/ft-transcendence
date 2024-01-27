import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserOperationClaim } from './userOperationClaim.entity';

@Entity({ name: 'operationClaims' })
export class OperationClaim {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  explanation: number;
  @Column()
  description: string;
  @ManyToOne(() => UserOperationClaim, (userOperationClaim) => userOperationClaim.operationClaimId)
  userOperationClaims: UserOperationClaim[];
}

import { User } from 'src/entities/concrete/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OperationClaim } from './operationClaim.entity';

@Entity({ name: 'userOperationClaims' })
export class UserOperationClaim {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  operationClaimId: number;
  @ManyToOne(() => OperationClaim, (operationClaim) => operationClaim.userOperationClaims)
  operationClaim: OperationClaim;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}

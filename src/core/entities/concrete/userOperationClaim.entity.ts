import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'useroperationclaims' })
export class UserOperationClaim {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  operationClaimId: number;
}

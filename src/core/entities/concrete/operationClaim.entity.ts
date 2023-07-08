import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'operationclaims' })
export class OperationClaim {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  explanation: number;
  @Column()
  description: string;
}

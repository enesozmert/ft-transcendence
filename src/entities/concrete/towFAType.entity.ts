import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('twoFATypes')
export class TwoFAType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 50})
  name: string;

  @Column({ type: 'date' })
  updateTime: Date;

  @Column({ type: 'boolean' })
  status: boolean;
}

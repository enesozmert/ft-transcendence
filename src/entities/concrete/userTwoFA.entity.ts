import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('userTwoFAs')
export class UserTwoFA {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  twoFAType: number;

  @Column()
  isTwoFA: boolean;

  @Column()
  isVerify: boolean;

  @Column({ nullable: true })
  settings: string;

  @Column({ type: 'date', nullable: true })
  updateTime: Date;

  @Column({ nullable: true })
  status: boolean;
}

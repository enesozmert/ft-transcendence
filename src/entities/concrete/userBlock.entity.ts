import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';

@Entity('userBlocks')
export class UserBlock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  blockerId: number;

  @Column()
  blockedId: number;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  // @JoinColumn({ name: 'blocker_id' })
  // blocker: User;

  // @JoinColumn({ name: 'blocked_id' })
  // blocked: User;

  @Column({ type: 'date', nullable: true })
  updateTime: Date;

  @Column({ nullable: true })
  status: boolean;
}

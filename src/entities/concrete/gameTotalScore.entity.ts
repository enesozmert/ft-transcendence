import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { GameResultName } from './gameResultName.entity';

@Entity('gameTotalScories')
export class GameTotalScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'userId', type: 'integer', nullable: false })
  userId: number;

  @Column({ name: 'totalScore', type: 'bigint', nullable: false })
  totalScore: number;

  @Column({ name: 'totalWin', type: 'bigint', nullable: false })
  totalWin: number;

  @Column({ name: 'totalLose', type: 'bigint', nullable: false })
  totalLose: number;

  @Column({ name: 'updateTime', type: 'date', nullable: true })
  updateTime: Date;

  @Column({ name: 'status', type: 'boolean', nullable: true })
  status: boolean;
}
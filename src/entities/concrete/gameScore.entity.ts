import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { GameResultName } from './gameResultName.entity';

@Entity('gameScories')
export class GameScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'userHostScore', type: 'integer', nullable: false })
  userHostScore: number;

  @Column({ name: 'userGuestScore', type: 'integer', nullable: false })
  userGuestScore: number;

  @Column({ name: 'resultNameId', type: 'integer', nullable: false })
  resultNameId: number;

  @Column({ name: 'updateTime', type: 'date', nullable: true })
  updateTime: Date;

  @Column({ name: 'status', type: 'boolean', nullable: true })
  status: boolean;
}
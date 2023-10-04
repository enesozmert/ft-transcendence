import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('gameHistories')
export class GameHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'userHostId', type: 'integer' })
  userHostId: number;

  @Column({ name: 'userGuestId', type: 'integer' })
  userGuestId: number;

  @Column({ name: 'finishDate', type: 'date' })
  finishDate: Date;

  @Column({ name: 'updateTime', type: 'date' })
  updateTime: Date;

  @Column({ name: 'status', type: 'boolean' })
  status: boolean;
}

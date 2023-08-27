import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('gameResultNames')
export class GameResultName {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'date', nullable: true })
  updateTime: Date;

  @Column({ type: 'boolean', nullable: true })
  status: boolean;
}
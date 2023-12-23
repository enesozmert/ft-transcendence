import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('userAchievements')
export class UserAchievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  userId: number;

  @Column({ type: 'integer', nullable: false })
  achievementId: number;

  @Column({ type: 'date', nullable: true })
  updateTime: Date;

  @Column({ type: 'boolean', nullable: true })
  status: boolean;
}
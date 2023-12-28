import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('achievementRules')
export class AchievementRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  achievementId: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  condition: string;

  @Column({ type: 'text', nullable: false })
  reward: string;

  @Column({ type: 'date', nullable: true })
  updateTime: Date;

  @Column({ type: 'boolean', nullable: true })
  status: boolean;
}
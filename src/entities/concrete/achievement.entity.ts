import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('achievements')
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  imagePath: string;

  @Column({ type: 'date', nullable: true })
  updateTime: Date;

  @Column({ type: 'boolean', nullable: true })
  status: boolean;
}
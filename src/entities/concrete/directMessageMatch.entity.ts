import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('directMessageMatches')
export class DirectMessageMatch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'hostId' })
  hostId: number;

  @Column({ name: 'guestId' })
  guestId: number;

  @Column({ type: 'date' })
  updateTime: Date;

  @Column({ type: 'boolean' })
  status: boolean;

  @Column({ name: 'accessId' })
  accessId: string;
}

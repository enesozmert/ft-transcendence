import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('chatRoomProperties')
export class ChatRoomProperty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  updateTime: Date;

  @Column({ type: 'boolean' })
  status: boolean;
}

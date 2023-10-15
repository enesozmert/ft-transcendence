import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('chatRoomUsers')
export class ChatRoomUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'chatRoomId' })
  chatRoomId: number;

  @Column({ name: 'userId' })
  userId: number;

  @Column({ type: 'date' })
  updateTime: Date;

  @Column({ type: 'boolean' })
  status: boolean;
}

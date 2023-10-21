import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('chatRooms')
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'accessId' })
  accessId: number;

  @Column({ name: 'roomTypeId' })
  roomTypeId: number;

  @Column({ name: 'roomUserId' })
  roomUserId: number;

  @Column({ name: 'userCount'})
  userCount: number;

  @Column({ name: 'hasPassword', type: 'boolean' })
  hasPassword: boolean;

  @Column({ type: 'date' })
  updateTime: Date;

  @Column({ type: 'boolean' })
  status: boolean;
}

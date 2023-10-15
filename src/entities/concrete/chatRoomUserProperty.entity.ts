import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('chatRoomUserProperties')
export class ChatRoomUserProperty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'chatRoomUserId' })
  chatRoomUserId: number;

  @Column({ name: 'chatRoomPropertyId' })
  chatRoomPropertyId: number;

  @Column({ type: 'date' })
  updateTime: Date;

  @Column({ type: 'boolean' })
  status: boolean;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('chatRooms')
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'accessId' })
  accessId: string;

  @Column({ name: 'roomTypeId' })
  roomTypeId: number;

  @Column({ name: 'roomUserId' })
  roomUserId: number;

  @Column({ name: 'userCount'})
  userCount: number;

  @Column({ name: 'hasPassword', type: 'boolean' })
  hasPassword: boolean;

  @Column({ type: 'bytea', nullable: true })
  passwordhash: Buffer;

  @Column({ type: 'bytea', nullable: true })
  passwordsalt: Buffer;

  @Column({ type: 'date' })
  updateTime: Date;

  @Column({ type: 'boolean' })
  status: boolean;
}

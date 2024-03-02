import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('directMessages')
export class DirectMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderId: number;

  @Column()
  receiverId: number;

  @Column('text')
  messageText: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'updateTime', type: 'date' })
  updateTime: Date;

  @Column({ name: 'status', type: 'boolean' })
  status: boolean;
}

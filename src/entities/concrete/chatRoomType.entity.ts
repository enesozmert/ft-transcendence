import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('chatRoomTypes')
export class ChatRoomType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'date' })
  updateTime: Date;

  @Column({ type: 'boolean' })
  status: boolean;
}

import {
    Column,
    Entity,
    PrimaryGeneratedColumn
  } from 'typeorm';
  
  @Entity('userFriends')
  export class UserFriend {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    fromUserId: number;
  
    @Column()
    targetUserId: number;
  
    @Column({ type: 'date', nullable: true })
    updateTime: Date;
  
    @Column({ nullable: true })
    status: boolean;
  }

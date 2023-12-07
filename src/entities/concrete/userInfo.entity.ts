import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('UserInfos')
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  loginDate: Date;

  @Column()
  profileCheck: boolean;

  @Column({ nullable: true })
  profileImagePath: string;

  @Column({ nullable: true })
  profileText: string;

  @Column()
  gender: boolean;

  @Column({ type: 'timestamp', nullable: true })
  birthdayDate: Date;

}

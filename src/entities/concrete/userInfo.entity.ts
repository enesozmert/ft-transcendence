import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('UserInfos')
export class UserInfos {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  UserId: number;

  @Column()
  LoginDate: Date;

  @Column()
  ProfileCheck: boolean;

  @Column({ nullable: true })
  ProfileImagePath: string;

  @Column({ nullable: true })
  ProfileText: string;

  @Column()
  Gender: boolean;

  @Column({ type: 'timestamp', nullable: true })
  BirthdayDate: Date;
}

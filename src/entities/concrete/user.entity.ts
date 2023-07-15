import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  firstname: string;

  @Column({ length: 50, nullable: true })
  lastname: string;

  @Column({ length: 50 })
  nickname: string;

  @Column({ type: 'bytea', nullable: true })
  passwordhash: Buffer;

  @Column({ type: 'bytea', nullable: true })
  passwordsalt: Buffer;

  @Column({ length: 50, nullable: true })
  address: string;

  @Column({ length: 10, nullable: true })
  phone: string;

  @Column({ nullable: false })
  email: string;

  @Column({ length: 50, nullable: false })
  verificationcode: string;

  @Column({ type: 'timestamp without time zone', nullable: true })
  updatetime: Date;

  @Column({ length: 50, nullable: true })
  explanation: string;

  @Column({ default: false })
  isverified: boolean;

  @Column({ nullable: true })
  status: boolean;
}
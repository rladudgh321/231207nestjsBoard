import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class SignupUserDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ select: false, nullable: true, insert: false, update: false })
  boardCount?: number;
}

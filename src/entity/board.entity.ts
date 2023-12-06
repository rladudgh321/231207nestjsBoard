import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { User } from './user.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({
    description: '내용',
    required: true,
    example: '안녕핫요',
  })
  contents: string;

  @Column()
  @IsNumber()
  @ApiProperty({
    description: '작성자 아이디',
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.boards)
  @JoinColumn({ name: 'userId' })
  user?: User;
}

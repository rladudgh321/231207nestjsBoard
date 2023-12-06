import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Board } from 'src/entity/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Board])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  findAll() {
    return this.boardRepository.find();
  }

  async findOne(id: number) {
    return await this.boardRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
  }

  async create(data: CreateBoardDto) {
    const board = this.boardRepository.create(data);
    await this.boardRepository.save(board);
    return board;
  }

  async update(id: number, data: UpdateBoardDto) {
    const board = await this.boardRepository.findOneBy({ id });

    if (!board)
      throw new HttpException(
        '게시글을 찾을 수 없습니다',
        HttpStatus.NOT_FOUND,
      );

    await this.boardRepository.update(id, {
      ...data,
    });
    if (!board)
      throw new HttpException(
        '수정하려 하는데 게시글이 없네',
        HttpStatus.NOT_FOUND,
      );
    return board;
  }

  async remove(id: number) {
    const board = await this.boardRepository.findOneBy({ id });

    if (!board)
      throw new HttpException(
        '게시글을 찾을 수 없습니다',
        HttpStatus.NOT_FOUND,
      );
    await this.boardRepository.remove(board);
    return board;
  }
}

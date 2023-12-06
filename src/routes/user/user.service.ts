import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { SignupUserDto } from './dto/signup-user.dto';
import { hash, compare } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser() {
    const qb = this.userRepository.createQueryBuilder();
    qb.addSelect((subQuery) => {
      return subQuery
        .select('count(id)')
        .from(Board, 'Board')
        .where('Board.userId = User.id');
    }, 'User_boardCount');
    return qb.getMany();
  }

  getUserByUsername = (username: string) => {
    return this.userRepository.findOneBy({ username });
  };

  async createUser(data: SignupUserDto) {
    const { username, password, name } = data;
    const passwordSalt = 12;
    const hashedPassword = await hash(password, passwordSalt);
    const user = await this.getUserByUsername(username);
    if (user)
      throw new HttpException(
        '이미 동일한 유저아이디가 존재합니다',
        HttpStatus.UNAUTHORIZED,
      );
    const result = await this.userRepository.save({
      username,
      password: hashedPassword,
      name,
    });
    return result;
  }

  async login(data: LoginUserDto) {
    const { username, password } = data;
    const user = await this.getUserByUsername(username);
    if (!user)
      throw new HttpException('유저 아이디 오류', HttpStatus.UNAUTHORIZED);
    const result = await compare(password, user.password);
    if (!result) throw new HttpException('비밀번호 오류', HttpStatus.NOT_FOUND);
    const payload = {
      username: user.username,
      name: user.name,
    };
    const accessToken: string = sign(payload, 'secret', { expiresIn: '1h' });
    return { accessToken };
  }
}

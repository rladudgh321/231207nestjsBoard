import { Injectable } from '@nestjs/common';
import { UserService } from 'src/routes/user/user.service';
import { compare } from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    if (!user) return null;
    const result = await compare(password, user.password);
    if (!result) return null;
    return user;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      name: user.name,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

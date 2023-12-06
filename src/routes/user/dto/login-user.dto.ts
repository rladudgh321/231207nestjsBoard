import { OmitType } from '@nestjs/swagger';
import { SignupUserDto } from './signup-user.dto';

export class LoginUserDto extends OmitType(SignupUserDto, [
  'name',
  'boardCount',
]) {}

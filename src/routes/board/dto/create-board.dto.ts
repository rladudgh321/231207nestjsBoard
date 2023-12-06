import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBoardDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  contents: string;
}

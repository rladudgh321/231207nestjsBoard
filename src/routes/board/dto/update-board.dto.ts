
import { OmitType } from '@nestjs/swagger';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends OmitType(CreateBoardDto, ['userId']) {}

// OmitType // 어떤 프로퍼티를 삭제해서 사용
//export class UpdateBoardDto extends PickType(CreateBoardDto, ['name']) {
//name 프로퍼티를 제외한 나머지 CreateBoardDto의 프로퍼티들을 모두 사용

// PickType // 어떤 프로퍼티는 반드시 수행해야한다
//export class UpdateBoardDto extends PickType(CreateBoardDto, ['name']) {
//name 프로퍼티를 반드시 수행해라

// PartialType 모든 프로퍼티들이 옵셔널하다
//export class UpdateBoardDto extends PartialType(CreateBoardDto){};

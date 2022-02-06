import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  readonly id: string;
  @IsNotEmpty({ message: 'Title required' })
  @IsString({ message: 'Must be a string' })
  readonly title: string;
  readonly columns: [];
}

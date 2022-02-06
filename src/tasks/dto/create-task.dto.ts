import { IsString, IsInt } from 'class-validator';
export class CreateTaskDto {
  readonly id: string;
  @IsString({ message: 'Must be a string' })
  readonly title: string;
  @IsInt({ message: 'Must be a number' })
  readonly order: number;
  @IsString({ message: 'Must be a string' })
  readonly description: string;
  readonly userId: string;
  readonly boardId: string;
  readonly columnId: string;
}

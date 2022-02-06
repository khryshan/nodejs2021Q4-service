import { IsString, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
  readonly id: string;
  @IsString({ message: 'Must be a string' })
  login: string;
  @IsString({ message: 'Must be a string' })
  name: string;
  @IsNotEmpty({ message: 'Password required' })
  @MinLength(8, {
    message: 'The password must be at least 8 characters long',
  })
  password: string;
}

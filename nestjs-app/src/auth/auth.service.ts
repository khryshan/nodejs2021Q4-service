import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from '../users/users.service';
import { validatePassword } from '../lib/helpers/hashHelper'


@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}


  async login(createAuthDto: CreateAuthDto) {
    const { login: userLogin, password } = createAuthDto;
    const user = await this.usersService.getUserByLogin(userLogin);

    if(user) {
      const { id: userId, login, password: hashedPassword = '' } = user;
      const isValidePassword = await validatePassword(password, hashedPassword);

      if(isValidePassword) {
        const token = this.jwtService.sign({ userId, login });
        return { token };
      };
    };

    throw new ForbiddenException('Access forbidden: wrong login or password'); 
  }
}

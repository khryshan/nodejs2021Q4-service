import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { genHashPassword } from '../lib/helpers/hashHelper';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const repository = getRepository(User);
    const hashedPassword = await genHashPassword(createUserDto?.password);
    const newUserDB = repository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    await repository.save(newUserDB);
    return newUserDB;
  }

  async findAll() {
    const repository = getRepository(User);
    const allUsers = await repository.find();
    return allUsers;
  }

  async findOne(id: string) {
    const repository = getRepository(User);
    const currentUser = await repository.findOne(id);
    return currentUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const repository = getRepository(User);
    const currentUser = await repository.findOne(id);

    if (currentUser) {
      await repository.update(id, { ...currentUser, ...updateUserDto });
    }
    const updatedUser = await repository.findOne(id);
    return updatedUser;
  }

  async remove(id: string) {
    let result = false;
    const repository = getRepository(User);
    const currentUser = await repository.findOne(id);

    if (currentUser) {
      await repository.delete(id);
      result = true;
    }

    return result;
  }

  async getUserByLogin(login: string) {
    const repository = getRepository(User);
    const currentUser = await repository.findOne({ login });

    return currentUser;
  }
}

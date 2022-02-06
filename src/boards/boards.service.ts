import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  async create(createBoardDto: CreateBoardDto) {
    const repository = getRepository(Board);
    const newBoardDB = repository.create(createBoardDto);
    await repository.save(newBoardDB);
    return newBoardDB;
  }

  async findAll() {
    const repository = getRepository(Board);
    const allBoards = await repository.find();
    return allBoards;
  }

  async findOne(id: string) {
    const repository = getRepository(Board);
    const currentBoard = await repository.findOne(id);
    return currentBoard;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const repository = getRepository(Board);
    let currentBoard = await repository.findOne(id);

    if (currentBoard) {
      currentBoard = Object.assign(currentBoard, updateBoardDto);
      await repository.save(currentBoard);
    }
    return currentBoard;
  }

  async remove(id: string) {
    let result = false;
    const repository = getRepository(Board);
    const currentBoard = await repository.findOne(id);

    if (currentBoard) {
      await repository.delete(id);
      result = true;
    }

    return result;
  }
}

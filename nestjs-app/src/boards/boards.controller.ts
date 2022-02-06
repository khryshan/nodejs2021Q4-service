import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { TasksService } from '../tasks/tasks.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import {AuthGuard} from '../auth/auth.guard';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly tasksService: TasksService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const currentBoard = await this.boardsService.findOne(id);
    if (currentBoard) {
      return currentBoard;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND); 
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    const updatedBoard = await this.boardsService.update(id, updateBoardDto);
    if (updatedBoard) {
      return updatedBoard;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const result = await this.boardsService.remove(id);
    
    await this.tasksService.deleteTasksOfBoard(id);

    if(result) {
      return;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}

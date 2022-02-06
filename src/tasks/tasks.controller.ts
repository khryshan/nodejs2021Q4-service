import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('/boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('boardId', new ParseUUIDPipe({ version: '4' })) boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Get()
  findAll(
    @Param('boardId', new ParseUUIDPipe({ version: '4' })) boardId: string,
  ) {
    return this.tasksService.findAll(boardId);
  }

  @Get(':taskId')
  async findOne(
    @Param('boardId', new ParseUUIDPipe({ version: '4' })) boardId: string,
    @Param('taskId', new ParseUUIDPipe({ version: '4' })) taskId: string,
  ) {
    const currentTask = await this.tasksService.findOne(taskId);
    if (currentTask) {
      return currentTask;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Put(':taskId')
  async update(
    @Param('boardId', new ParseUUIDPipe({ version: '4' })) boardId: string,
    @Param('taskId', new ParseUUIDPipe({ version: '4' })) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const updatedTask = await this.tasksService.update(taskId, updateTaskDto);
    if (updatedTask) {
      return updatedTask;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('boardId', new ParseUUIDPipe({ version: '4' })) boardId: string,
    @Param('taskId', new ParseUUIDPipe({ version: '4' })) taskId: string,
  ) {
    const result = await this.tasksService.remove(taskId);

    if (result) {
      return;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}

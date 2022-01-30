import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  async create(boardId: string, createTaskDto: CreateTaskDto) {
    const newTask = {
      ...createTaskDto,
      boardId,
    };

    const repository = getRepository(Task);
    const newTaskDB = repository.create(newTask);
    await repository.save(newTaskDB);
    return newTaskDB;
  }

  async findAll(boardId: string) {
    const repository = getRepository(Task);
    const allTasks = await repository.find({ where: { boardId } });
    return allTasks;
  }

  async findOne(taskId: string) {
    const repository = getRepository(Task);
    const currentTask = await repository.findOne(taskId);
    return currentTask;
  }

  async update(taskId: string, updateTaskDto: UpdateTaskDto) {
    const repository = getRepository(Task);
    const currentTask = await repository.findOne(taskId);

    if (currentTask) {
      await repository.update(taskId, {...currentTask, ...updateTaskDto});
    }
    const updatedTask = await repository.findOne(taskId)
    return updatedTask;
  }

  async remove(taskId: string) {
    let result = false;
    const repository = getRepository(Task);
    const currentTask = await repository.findOne(taskId);

    if (currentTask) {
      await repository.delete(taskId);
      result = true
    }

    return result;
  }

  async deleteTasksOfBoard (boardId: string) {
    const repository = getRepository(Task);
    await repository.delete({ boardId });
  };

  async setDefaultUserId (userId:string) {
    const repository = getRepository(Task);
    await repository.update({ userId }, { userId: null });
  };
}

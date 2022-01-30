import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { TasksService } from '../tasks/tasks.service';
import { BoardsController } from './boards.controller';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, TasksService]
})
export class BoardsModule {}

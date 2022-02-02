import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TasksService } from '../tasks/tasks.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, TasksService],
  exports: [UsersService]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { TasksService } from '../tasks/tasks.service';
import { BoardsController } from './boards.controller';
import { AuthModule } from 'auth/auth.module';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, TasksService],
  imports: [AuthModule],
})
export class BoardsModule {}

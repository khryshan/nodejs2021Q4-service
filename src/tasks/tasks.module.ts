import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { AuthModule } from 'auth/auth.module';
@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [AuthModule],
})
export class TasksModule {}

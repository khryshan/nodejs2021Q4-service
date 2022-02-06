import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TasksService } from '../tasks/tasks.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, TasksService],
  imports: [forwardRef(() => AuthModule)],
  exports: [UsersService]
})
export class UsersModule {}

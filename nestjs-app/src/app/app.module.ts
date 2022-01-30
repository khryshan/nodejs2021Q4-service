import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { BoardsModule } from '../boards/boards.module';
import { TasksModule } from '../tasks/tasks.module';
import { getTypeOrmConfig } from '../common/app.dbconfig';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env '
    }),
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    UsersModule,
    BoardsModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

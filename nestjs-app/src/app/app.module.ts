import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { BoardsModule } from '../boards/boards.module';
import { TasksModule } from '../tasks/tasks.module';
import { getTypeOrmConfig } from '../common/app.dbconfig';
import { LOG_LEVEL } from '../common/app.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env '
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: LOG_LEVEL,
        serializers: {
          res(reply) {
            return {
              statusCode: reply.statusCode,
            }
          },
          req(request) {
            return {
              method: request.method,
              url: request.url,
              params: request.params,
            };
          }
        },
        transport: {
          targets: [
            {
              level: 'info',
              target: 'pino-pretty',
              options: { 
                destination: './logs/logs.log',
                mkdir: true,
                translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
                ignore: 'pid,hostname,reqId',
                singleLine: true,
              }
            }, {
              level: 'error',
              target: 'pino-pretty',
              options: {
                destination: './logs/errors.log',
                mkdir: true,
                translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
                ignore: 'pid,hostname,reqId',
                singleLine: true,
              }
            }, 
            {
              target: 'pino-pretty',
              level: LOG_LEVEL,
              options: {
                colorize: true,
                translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
                ignore: 'pid,hostname,reqId,responseTime',
                singleLine: true,
              },
            }
          ],
        },
      }
    }),
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    AuthModule,
    UsersModule,
    BoardsModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { AuthModule } from 'auth/auth.module';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [AuthModule],
})
export class FileModule {}

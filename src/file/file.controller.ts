import {
  Controller,
  Get,
  Post,
  Param,
  HttpCode,
  HttpStatus,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('file')
@UseGuards(AuthGuard)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadFile(file);
  }

  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string) {
    const file = await this.fileService.getFile(fileName);
    return new StreamableFile(file);
  }
}

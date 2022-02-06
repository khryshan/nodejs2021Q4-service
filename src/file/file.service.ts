import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createReadStream, existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';

@Injectable()
export class FileService {
  uploadFile(file: Express.Multer.File) {
    const fileName = file.originalname;

    try {
      const filePath = resolve(`${process.cwd()}/src/static`);

      if (!existsSync(filePath)) {
        mkdirSync(filePath, { recursive: true });
      }
      writeFileSync(join(filePath, fileName), file.buffer);
    } catch (e) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return `File ${fileName} was uploaded!`;
  }

  async getFile(fileName: string) {
    try {
      const file = createReadStream(
        resolve(`${process.cwd()}/src/static`, fileName),
      );

      return file;
    } catch (e) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

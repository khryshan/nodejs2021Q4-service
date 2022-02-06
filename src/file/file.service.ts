import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  async uploadFile(file: Express.Multer.File) {
    try {
      const fileName = file.originalname;
      const filePath = path.resolve(`${process.cwd()}/src/static`);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
    } catch (e) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return 'File was uploaded!';
  }

  findOne(fileName: string) {
    return `This action returns a #${fileName} file`;
  }
}

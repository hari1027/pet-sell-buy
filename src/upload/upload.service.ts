import { Injectable } from '@nestjs/common';
import { Express } from 'express'; // This is fine
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  private uploadPath = 'uploads';

  constructor() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<{ url: string; name: string }> {
    if (!file) {
      throw new Error('File is missing');
    }

    const fileUrl = `https://pet-sell-buy.onrender.com/${this.uploadPath}/${file.filename}`;

    return { url: fileUrl, name: file.originalname };
  }
}

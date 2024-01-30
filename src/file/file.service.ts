import { Injectable, NotFoundException } from '@nestjs/common';
import { createReadStream, statSync } from 'fs';

@Injectable()
export class FileService {

    getFileStream(filePath: string) {
        try {
            const stats = statSync(filePath);
            const fileStream = createReadStream(filePath);
            return { stats, fileStream };
        } catch (error) {
            throw new NotFoundException(`File not found: ${filePath}`);
        }
    }
}

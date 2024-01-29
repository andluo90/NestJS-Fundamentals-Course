import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import type {Response} from 'express'
import { IsPublic } from 'src/common/decorators/is-public.decorator';

@Controller('file')
export class FileController {

    @IsPublic(true)
    @Get()
    getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
    // console.log(`path:`,join(process.cwd(), 'package.json'));
    
    const file = createReadStream(join(process.cwd(), 'musicFiles/testMusic.mp3'));
    res.set({
        'Content-Type': 'audio/mpeg',
        // 'Content-Length': file.siz,
        'Content-Disposition': 'attachment; filename=testMusic.mp3',

    });
    return new StreamableFile(file);
    }
}

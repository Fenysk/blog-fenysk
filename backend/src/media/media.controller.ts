import { Body, Controller, Get, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtGuard } from 'src/auth/guard';
import * as path from 'path';
import { Response } from 'express';


@Controller('media')
export class MediaController {

    @UseGuards(JwtGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}`)
            }
        }),
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return { filename: file.originalname };
    }

    @Get()
    getFile(@Res() res: Response, @Body() file: Express.Multer.File) {
        res.sendFile(path.join(__dirname, '..', '..', 'uploads', file.originalname))
        return { filename: file.originalname };
    }

}
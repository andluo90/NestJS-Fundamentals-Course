import { Body, Controller, Post, Req } from '@nestjs/common';
import { AudioService } from './audio.service';
import { CreateAudioDto } from './dto/create-audio.dto';

@Controller('audio')
export class AudioController {
    constructor(private readonly audioService: AudioService) {}



    @Post()
    create(@Body() createAudioDto: CreateAudioDto) {
      return this.audioService.create(createAudioDto,);
    }

}

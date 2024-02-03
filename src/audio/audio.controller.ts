import { Body, Controller, Patch, Post, Req } from '@nestjs/common';
import { AudioService } from './audio.service';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';

@Controller('audio')
export class AudioController {
    constructor(private readonly audioService: AudioService) {}



    @Post()
    create(@Body() createAudioDto: CreateAudioDto) {
      return this.audioService.create(createAudioDto,);
    }

    @Post('update')
    update(@Body() updateAudioDto: UpdateAudioDto) {
      return this.audioService.update(updateAudioDto);
    }    


}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateAudioDto } from './dto/create-audio.dto';
import { Audio } from './entities/audio.entity';

@Injectable()
export class AudioService {

    constructor(
        @InjectRepository(Audio)
        private readonly audioRepository: Repository<Audio>,
    ){

    }

    async create(createAudioDto: CreateAudioDto) {
    
    
        const audio = this.audioRepository.create(createAudioDto);
        return this.audioRepository.save(audio);
      }    


}

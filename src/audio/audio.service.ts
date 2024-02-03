import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from 'src/exceptions/custom-exceptions';

import { Repository } from 'typeorm';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';
import { Audio } from './entities/audio.entity';

@Injectable()
export class AudioService {

    constructor(
        @InjectRepository(Audio)
        private readonly audioRepository: Repository<Audio>,
    ) {

    }

    async create(createAudioDto: CreateAudioDto) {
        try {
            const audio = this.audioRepository.create(createAudioDto);
            return await this.audioRepository.save(audio);
        } catch (error) {
            if(error.code === 'SQLITE_CONSTRAINT'){
                throw new CustomException("id已存在.")
            }
            throw error
        }
    }

    async update(updateAudioDto: UpdateAudioDto) {
        let audio = await this.preloadAudioById(updateAudioDto.songid)
        audio = await this.audioRepository.preload({
            ...audio,
            isDownloaded:updateAudioDto.isDownloaded
        });
        
        const res = await this.audioRepository.save(audio);
        return true
    }  
    
    private async preloadAudioById(songid:number): Promise<Audio> {
        const existingAudio = await this.audioRepository.findOneBy({songid})
        if(existingAudio){
          return existingAudio
        }else{
            throw new NotFoundException(`Audio #${songid} not found...`);
        }
        
    }    


}

import { Injectable, NotFoundException } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoldPrice } from './entities/gold-price.entity';

@Injectable()
export class GoldPriceService {
    constructor(
        @InjectRepository(GoldPrice)
        private readonly goldPriceRepository: Repository<GoldPrice>,
        
        private schedulerRegistry: SchedulerRegistry,
    ) {}


    async getTodayPrice(){

        const goldPrice = await this.goldPriceRepository.find();
        if (!goldPrice) {
            throw new NotFoundException(`goldPrice not found`);
        }

        return goldPrice;

    }

    /**
     * 启动服务
     * @returns 
     */
    async startService(){
        let cronJob = this.schedulerRegistry.getCronJob('fetchGoldPrice')

        if(cronJob){
            if(cronJob.running){
                return '已启动'
            }else{
                cronJob.start()
                return '启动成功'
            }
        }else{
            return '找不到服务'
        }

    }

    /**
     * 停止服务
     * @returns 
     */
    async stopService(){
        let cronJob = this.schedulerRegistry.getCronJob('fetchGoldPrice')
        if(cronJob){
            if(cronJob.running){
                cronJob.stop()
                return '停止成功'
            }else{
                return '已停止'
            }
        }else{
            return '找不到服务'
        }
    }

}

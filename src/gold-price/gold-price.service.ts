import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class GoldPriceService {
    constructor(private schedulerRegistry: SchedulerRegistry) {}


    async getTodayPrice(){
        let cronJob = this.schedulerRegistry.getCronJob('fetchGoldPrice')
        console.log(`cronJob:`,cronJob.running,cronJob.lastDate());
        
        return '222'
    }

}

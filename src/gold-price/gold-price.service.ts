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

    /**
     * 启动服务
     * @returns 
     */
    async startService(){
        let cronJob = this.schedulerRegistry.getCronJob('fetchGoldPrice')
        if(cronJob && !cronJob.running){
            cronJob.start()
            return 'started'
        }
    }

    /**
     * 停止服务
     * @returns 
     */
    async stopService(){
        let cronJob = this.schedulerRegistry.getCronJob('fetchGoldPrice')
        if(cronJob && cronJob.running){
            cronJob.stop()
            return 'stoped'
        }
    }

}

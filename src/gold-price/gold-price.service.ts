import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class GoldPriceService {
    constructor(
        private schedulerRegistry: SchedulerRegistry,
    ) {}


    async getTodayPrice(){

        return 'getTodayPrice ... '
          

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

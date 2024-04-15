import { Injectable, NotFoundException } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CronService } from 'src/cron/cron.service';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { GoldPrice } from './entities/gold-price.entity';

@Injectable()
export class GoldPriceService {
    constructor(
        @InjectRepository(GoldPrice)
        private readonly goldPriceRepository: Repository<GoldPrice>,
        private readonly cronService: CronService,
        private schedulerRegistry: SchedulerRegistry,
        private readonly emailService:EmailService,
    ) {}


    async getTodayPrice(){

        const goldPrice = await this.goldPriceRepository.createQueryBuilder('entity').orderBy('entity.id', 'DESC').getOne()
        if (!goldPrice) {
            throw new NotFoundException(`goldPrice not found`);
        }
        this.emailService.sendEmail('allenmiller0909@gmail.com','gold-price-today',`current gold price today:${goldPrice.current}`)
        
        return goldPrice
        // return {
        //     '当前价格:':goldPrice.current,
        //     '今日最高:':goldPrice.todayHigh,
        //     '今日最低:':goldPrice.todayHigh,
        //     '今日开盘:':goldPrice.todayStart,
        //     '昨天收盘:':goldPrice.yestodayEnd,
        //     '日期':goldPrice.date,
        // };

    }

    /**
     * 获取最新价格
     * @returns 
     */
    async getLastestPrice(){
        
        await this.cronService.executeCronJob()
        const goldPrice = await this.goldPriceRepository.createQueryBuilder('entity').orderBy('entity.id', 'DESC').getOne()
        if (!goldPrice) {
            throw new NotFoundException(`goldPrice not found`);
        }
        return goldPrice

        // return {
        //     '最新价格:':goldPrice.current,
        //     '今日最高:':goldPrice.todayHigh,
        //     '今日最低:':goldPrice.todayLow,
        //     '今日开盘:':goldPrice.todayStart,
        //     '昨天收盘:':goldPrice.yestodayEnd,
        //     '日期':goldPrice.date,
        // };

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

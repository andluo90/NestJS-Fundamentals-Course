import { Injectable } from '@nestjs/common';
import { Cron, CronExpression,SchedulerRegistry } from '@nestjs/schedule';



@Injectable()
export class CronService {

    @Cron(CronExpression.EVERY_30_SECONDS,{name:'fetchGoldPrice'})
    handleCron() {
      console.log(`Called every 30 seconds`);
    }

}

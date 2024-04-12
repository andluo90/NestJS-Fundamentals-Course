import { Module } from '@nestjs/common';
import {HttpModule} from '@nestjs/axios'
import { CronService } from './cron.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoldPrice } from 'src/gold-price/entities/gold-price.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([GoldPrice]),
    HttpModule],
  providers: [CronService],
  exports:[CronService]

})
export class CronModule {}

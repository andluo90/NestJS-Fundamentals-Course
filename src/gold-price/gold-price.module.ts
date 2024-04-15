import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronModule } from 'src/cron/cron.module';
import emailConfig from 'src/email/config/email.config';
import { EmailService } from 'src/email/email.service';
import { GoldPrice } from './entities/gold-price.entity';
import { GoldPriceController } from './gold-price.controller';
import { GoldPriceService } from './gold-price.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([GoldPrice]),
    CronModule,
    ConfigModule.forFeature(emailConfig),
  ],
  controllers: [GoldPriceController],
  providers: [GoldPriceService,EmailService]
})
export class GoldPriceModule {}

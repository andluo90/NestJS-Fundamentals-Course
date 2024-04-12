import { Module } from '@nestjs/common';
import { GoldPriceController } from './gold-price.controller';
import { GoldPriceService } from './gold-price.service';

@Module({
  imports:[],
  controllers: [GoldPriceController],
  providers: [GoldPriceService]
})
export class GoldPriceModule {}

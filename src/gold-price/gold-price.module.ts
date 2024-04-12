import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoldPrice } from './entities/gold-price.entity';
import { GoldPriceController } from './gold-price.controller';
import { GoldPriceService } from './gold-price.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([GoldPrice]),
  ],
  controllers: [GoldPriceController],
  providers: [GoldPriceService]
})
export class GoldPriceModule {}

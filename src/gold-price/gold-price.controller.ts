import { Controller, Get, Post } from '@nestjs/common';
import { IsPublic } from 'src/common/decorators/is-public.decorator';
import { GoldPriceService } from './gold-price.service';

@Controller('gold-price')
export class GoldPriceController {
    constructor(private readonly goldPriceService: GoldPriceService) {}


    @IsPublic(true)
    @Get('today')
    todayPrice() {
      // console.log(typeof id);
      return this.goldPriceService.getTodayPrice();
    }

    @IsPublic(true)
    @Post('startService')
    startService() {
      return this.goldPriceService.startService();
    }

    @IsPublic(true)
    @Post('stopService')
    stopService() {
      return this.goldPriceService.stopService();
    }    

}

import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { IamModule } from './iam/iam.module';
import { UsersModule } from './users/users.module';
import appConfig from './config/app.config';
import { FileModule } from './file/file.module';
import { AudioModule } from './audio/audio.module';
import { GoldPriceModule } from './gold-price/gold-price.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';



@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   useFactory: () => ({
    //     type: 'postgres',
    //     host: process.env.DATABASE_HOST,
    //     port: +process.env.DATABASE_PORT,
    //     username: process.env.DATABASE_USER,
    //     password: process.env.DATABASE_PASSWORD,
    //     database: process.env.DATABASE_NAME,
    //     autoLoadEntities: true,
    //     synchronize: true,
    //   }),
    // }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
      load: [appConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './test.db', // 指定 SQLite 数据库文件路径
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CoffeesModule,
    CoffeeRatingModule,
    DatabaseModule,
    IamModule,
    UsersModule,
    FileModule,
    AudioModule,
    GoldPriceModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, CronService],
})
export class AppModule {
  constructor(){
    console.log('AppModule env:',process.env.NODE_ENV);

    
  }
}

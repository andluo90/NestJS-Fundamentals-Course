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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileModule } from './file/file.module';



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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'musicFiles'),
      serveRoot: '/public'
    }),    
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(){
    console.log('AppModule env:',process.env.NODE_ENV);

    
  }
}

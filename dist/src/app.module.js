"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const Joi = require("joi");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const coffees_module_1 = require("./coffees/coffees.module");
const coffee_rating_module_1 = require("./coffee-rating/coffee-rating.module");
const database_module_1 = require("./database/database.module");
const config_1 = require("@nestjs/config");
const iam_module_1 = require("./iam/iam.module");
const users_module_1 = require("./users/users.module");
const app_config_1 = require("./config/app.config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'musicFiles'),
                serveRoot: '/public'
            }),
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    DATABASE_HOST: Joi.required(),
                    DATABASE_PORT: Joi.number().default(5432),
                }),
                load: [app_config_1.default],
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: './test.db',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            coffees_module_1.CoffeesModule,
            coffee_rating_module_1.CoffeeRatingModule,
            database_module_1.DatabaseModule,
            iam_module_1.IamModule,
            users_module_1.UsersModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
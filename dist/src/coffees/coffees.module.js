"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("../events/entities/event.entity");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const coffees_constants_1 = require("./coffees.constants");
const coffees_controller_1 = require("./coffees.controller");
const coffees_service_1 = require("./coffees.service");
const coffees_config_1 = require("./config/coffees.config");
const coffee_entity_1 = require("./entities/coffee.entity");
const flavor_entity_1 = require("./entities/flavor.entity");
let CoffeesModule = class CoffeesModule {
};
CoffeesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([coffee_entity_1.Coffee, flavor_entity_1.Flavor, event_entity_1.Event, user_entity_1.User]),
            config_1.ConfigModule.forFeature(coffees_config_1.default),
        ],
        controllers: [coffees_controller_1.CoffeesController],
        providers: [
            coffees_service_1.CoffeesService,
            {
                provide: coffees_constants_1.COFFEE_BRANDS,
                useFactory: async (connection) => {
                    const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
                    console.log('[!] Async factory');
                    return coffeeBrands;
                },
                inject: [typeorm_2.Connection],
            },
        ],
        exports: [coffees_service_1.CoffeesService],
    })
], CoffeesModule);
exports.CoffeesModule = CoffeesModule;
//# sourceMappingURL=coffees.module.js.map
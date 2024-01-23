"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const coffee_entity_1 = require("./entities/coffee.entity");
const flavor_entity_1 = require("./entities/flavor.entity");
const event_entity_1 = require("../events/entities/event.entity");
const coffees_constants_1 = require("./coffees.constants");
const config_1 = require("@nestjs/config");
const coffees_config_1 = require("./config/coffees.config");
const user_entity_1 = require("../users/entities/user.entity");
let CoffeesService = class CoffeesService {
    constructor(coffeeRepository, flavorRepository, UserRepository, connection, coffeeBrands, configService, coffeesConfiguration) {
        this.coffeeRepository = coffeeRepository;
        this.flavorRepository = flavorRepository;
        this.UserRepository = UserRepository;
        this.connection = connection;
        this.configService = configService;
        this.coffeesConfiguration = coffeesConfiguration;
        console.log('CoffeesService instantiated');
        const databaseHost = this.configService.get('database.host', 'localhost');
        const coffeesConfig = this.configService.get('coffees.foo');
        console.log(databaseHost, coffeesConfig, coffeesConfiguration, coffeesConfiguration.foo);
    }
    async findAll(userId, paginationQuery) {
        console.log(`userId:`, userId);
        const users = await this.UserRepository.findOne({
            where: { id: userId },
            relations: ['coffees', 'coffees.flavors', 'coffees.user']
        });
        if (users) {
            return users.coffees;
        }
        else {
            return [];
        }
    }
    async findOne(id) {
        const coffee = await this.coffeeRepository.findOne({
            where: { id },
            relations: ['flavors'],
        });
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }
    async create(userId, createCoffeeDto) {
        const user = await this.preloadUserByUserId(userId);
        const flavors = await Promise.all(createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)));
        const coffee = this.coffeeRepository.create(Object.assign(Object.assign({}, createCoffeeDto), { flavors,
            user }));
        return this.coffeeRepository.save(coffee);
    }
    async update(userId, id, updateCoffeeDto) {
        const user = await this.preloadUserByUserId(userId);
        const flavors = await Promise.all(updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)));
        const coffee = await this.coffeeRepository.preload(Object.assign(Object.assign({ id }, updateCoffeeDto), { flavors,
            user }));
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee #${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }
    async remove(id) {
        const coffee = await this.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }
    async recommendCoffee(coffee) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            coffee.recommendations++;
            const recommendEvent = new event_entity_1.Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = JSON.stringify({ coffeeId: coffee.id });
            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async preloadFlavorByName(name) {
        const existingFlavor = await this.flavorRepository.findOneBy({ name });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }
    async preloadUserByUserId(id) {
        const existingUser = await this.UserRepository.findOneBy({ id });
        if (existingUser) {
            console.log(`id:${id} 用户存在`);
            return existingUser;
        }
    }
};
CoffeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coffee_entity_1.Coffee)),
    __param(1, (0, typeorm_1.InjectRepository)(flavor_entity_1.Flavor)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(4, (0, common_1.Inject)(coffees_constants_1.COFFEE_BRANDS)),
    __param(6, (0, common_1.Inject)(coffees_config_1.default.KEY)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection, Array, config_1.ConfigService, Object])
], CoffeesService);
exports.CoffeesService = CoffeesService;
//# sourceMappingURL=coffees.service.js.map
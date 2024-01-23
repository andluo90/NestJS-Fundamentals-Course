import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Connection, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { ConfigService } from '@nestjs/config';
import { Coffees } from './config/coffees.config';
import { User } from 'src/users/entities/user.entity';
export declare class CoffeesService {
    private readonly coffeeRepository;
    private readonly flavorRepository;
    private readonly UserRepository;
    private readonly connection;
    private readonly configService;
    private readonly coffeesConfiguration;
    constructor(coffeeRepository: Repository<Coffee>, flavorRepository: Repository<Flavor>, UserRepository: Repository<User>, connection: Connection, coffeeBrands: string[], configService: ConfigService, coffeesConfiguration: Coffees);
    findAll(userId: number, paginationQuery: PaginationQueryDto): Promise<Coffee[]>;
    findOne(id: number): Promise<Coffee>;
    create(userId: number, createCoffeeDto: CreateCoffeeDto): Promise<Coffee>;
    update(userId: number, id: number, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee>;
    remove(id: number): Promise<Coffee>;
    recommendCoffee(coffee: Coffee): Promise<void>;
    private preloadFlavorByName;
    private preloadUserByUserId;
}

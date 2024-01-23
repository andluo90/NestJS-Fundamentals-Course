import { Request } from 'express';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
export declare class CoffeesController {
    private readonly coffeesService;
    constructor(coffeesService: CoffeesService);
    findAll(request: Request, paginationQuery: PaginationQueryDto): Promise<import("./entities/coffee.entity").Coffee[]>;
    findOne(id: number): Promise<import("./entities/coffee.entity").Coffee>;
    create(request: Request, createCoffeeDto: CreateCoffeeDto): Promise<import("./entities/coffee.entity").Coffee>;
    update(request: Request, id: number, updateCoffeeDto: UpdateCoffeeDto): Promise<import("./entities/coffee.entity").Coffee>;
    remove(id: number): Promise<import("./entities/coffee.entity").Coffee>;
}

import { Coffee } from "src/coffees/entities/coffee.entity";
export declare class User {
    id: number;
    email: string;
    password: string;
    coffees: Coffee[];
}

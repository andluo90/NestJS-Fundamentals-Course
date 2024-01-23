import { Flavor } from './flavor.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Coffee {
    id: number;
    name: string;
    description: string;
    brand: string;
    recommendations: number;
    remark: string;
    flavors: Flavor[];
    user: User;
}

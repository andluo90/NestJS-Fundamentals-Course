import { DynamicModule } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
export declare class DatabaseModule {
    static register(options: ConnectionOptions): DynamicModule;
}

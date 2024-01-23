import { MigrationInterface, QueryRunner } from "typeorm";
export declare class SchemaSync1657099684583 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

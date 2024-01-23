"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaSync1657099684583 = void 0;
class SchemaSync1657099684583 {
    constructor() {
        this.name = 'SchemaSync1657099684583';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" ADD "description" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
    }
}
exports.SchemaSync1657099684583 = SchemaSync1657099684583;
//# sourceMappingURL=1657099684583-SchemaSync.js.map
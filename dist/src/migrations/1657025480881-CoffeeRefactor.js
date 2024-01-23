"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeRefactor1657025480881 = void 0;
class CoffeeRefactor1657025480881 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`);
    }
}
exports.CoffeeRefactor1657025480881 = CoffeeRefactor1657025480881;
//# sourceMappingURL=1657025480881-CoffeeRefactor.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPublic = void 0;
const common_1 = require("@nestjs/common");
const IsPublic = (arg) => {
    return (0, common_1.SetMetadata)('isPublic', arg);
};
exports.IsPublic = IsPublic;
//# sourceMappingURL=is-public.decorator.js.map
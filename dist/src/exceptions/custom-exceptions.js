"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = void 0;
const common_1 = require("@nestjs/common");
class CustomException extends common_1.HttpException {
    constructor(errorMessage, httpStatus = 300) {
        super(errorMessage, httpStatus);
    }
}
exports.CustomException = CustomException;
//# sourceMappingURL=custom-exceptions.js.map
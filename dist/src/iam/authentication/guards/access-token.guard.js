"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../../config/jwt.config");
const iam_constants_1 = require("../../iam.constants");
let AccessTokenGuard = class AccessTokenGuard {
    constructor(reflector, jwtService, jwtConfiguration) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.jwtConfiguration = jwtConfiguration;
    }
    async canActivate(context) {
        const isPublic = this.reflector.get('isPublic', context.getHandler());
        console.log(`isPublic`, isPublic);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);
        if (!token) {
            console.log(`没有token.`);
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, this.jwtConfiguration);
            request[iam_constants_1.REQUEST_USER_KEY] = payload;
        }
        catch (error) {
            console.error(error);
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        console.log(`Request`, request);
        const [_, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        return token;
    }
    extractTokenFromRequest(request) {
        const cookiesStr = request.headers.cookie;
        if (!cookiesStr) {
            return '';
        }
        const cookiesArray = cookiesStr.split('; ');
        let accessTokenValue;
        cookiesArray.forEach((cookie) => {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === 'accessToken') {
                accessTokenValue = cookieValue;
            }
        });
        console.log(`extractTokenFromRequest`, accessTokenValue);
        return accessTokenValue;
    }
};
AccessTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService, void 0])
], AccessTokenGuard);
exports.AccessTokenGuard = AccessTokenGuard;
//# sourceMappingURL=access-token.guard.js.map
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
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const is_public_decorator_1 = require("../../common/decorators/is-public.decorator");
const authentication_service_1 = require("./authentication.service");
const sign_in_dto_1 = require("./dto/sign-in.dto");
const sign_up_dto_1 = require("./dto/sign-up.dto");
let AuthenticationController = class AuthenticationController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(signUpDto) {
        return this.authService.signUp(signUpDto);
    }
    async signIn(response, signInDto) {
        console.log(`signInDto`, signInDto);
        const { accessToken } = await this.authService.signIn(signInDto);
        response.cookie('accessToken', accessToken, {
            secure: true,
            httpOnly: true,
            sameSite: true
        });
    }
};
__decorate([
    (0, is_public_decorator_1.IsPublic)(true),
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignUpDto]),
    __metadata("design:returntype", void 0)
], AuthenticationController.prototype, "signUp", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, is_public_decorator_1.IsPublic)(true),
    (0, common_1.Post)('sign-in'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, sign_in_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "signIn", null);
AuthenticationController = __decorate([
    (0, common_1.Controller)('authentication'),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map
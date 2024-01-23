import { HttpException } from '@nestjs/common';
export declare class CustomException extends HttpException {
    constructor(errorMessage: any, httpStatus?: number);
}

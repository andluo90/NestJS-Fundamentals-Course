import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
export declare class AuthenticationController {
    private readonly authService;
    constructor(authService: AuthenticationService);
    signUp(signUpDto: SignUpDto): Promise<void>;
    signIn(response: Response, signInDto: SignInDto): Promise<void>;
}

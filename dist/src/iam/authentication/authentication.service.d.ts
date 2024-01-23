import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import jwtConfig from '../config/jwt.config';
import { HashingService } from '../hashing/hashing.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
export declare class AuthenticationService {
    private readonly usersRepository;
    private readonly hashingService;
    private readonly jwtService;
    private readonly jwtConfiguration;
    constructor(usersRepository: Repository<User>, hashingService: HashingService, jwtService: JwtService, jwtConfiguration: ConfigType<typeof jwtConfig>);
    signUp(signUpDto: SignUpDto): Promise<void>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
    }>;
}

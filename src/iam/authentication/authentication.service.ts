import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(User) private readonly usersRepository:Repository<User>,
        private readonly hashingService:HashingService,
    ){}

    /**
     * 注册
     * @param signUpDto 
     */
    async signUp(signUpDto:SignUpDto){
        try {
            const user = new User()
            user.email = signUpDto.email
            user.password = await this.hashingService.hash(signUpDto.password)
            await this.usersRepository.save(user)            
        } catch (error) {
            const pgUniqueViolationErrorCode = '23505'
            if(error.code === pgUniqueViolationErrorCode){
                throw new ConflictException();
            }
            throw error
        }

    }
    
    /**
     * 登录
     * @param signInDto 
     */
    async signIn(signInDto:SignInDto){
        
        const user = await this.usersRepository.findOneBy({
            email:signInDto.email
        })
        if(!user){
            throw new UnauthorizedException('该用户不存在.')
        }
        const isEqual = await this.hashingService.compare(
            signInDto.password,
            user.password
        )
        if(!isEqual){
            throw new UnauthorizedException('密码不正确.')
        }
        return true

    }

}

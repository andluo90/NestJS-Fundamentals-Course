import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from 'src/iam/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {

  constructor(
    private readonly reflector:Reflector,
    private readonly jwtService:JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration:ConfigType<typeof jwtConfig>
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{

    const isPublic = this.reflector.get('isPublic',context.getHandler())
    console.log(`isPublic`,isPublic);
    if(isPublic){
      return true
    }
    

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if(!token){
      console.log(`111`);
      
      throw new UnauthorizedException();
    }
    try {

      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration
      )
      request[REQUEST_USER_KEY] = payload
      console.log(payload);
      
    } catch (error) {
      console.error(error);

      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request:Request):string|undefined{
    const [_,token] = request.headers.authorization?.split(' ') ?? []
    return token
  }

}

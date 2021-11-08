import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, Token } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo:Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ){}

    async register(body: UserDto){
        try{
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(body.password, saltOrRounds);
            await this.userRepo.save({...body,country:{id:body.country},password:hash})
            return new HttpException({
                status:HttpStatus.CREATED,
                success:"Successfully registered"
            },HttpStatus.CREATED)
        }catch(err){
            return new ForbiddenException({errpr:err.detail})
        }
    }

    async login(data:LoginDto):Promise<Token | unknown>{
        try{
            const user = await this.userRepo.findOne({email:data.email})
            if(user){
                const isMatch = await bcrypt.compare(data.password, user.password);
                if(isMatch){
                    return { token: this.jwtService.sign({ id: user.id }) };
                }else{
                    return new UnauthorizedException({error:'invalid password'})
                }
            }else{
                return new NotFoundException({error:'User not found'})
            }
          
          
         
        }catch(err){
            console.log(err);
            
        }
      }

      async verifyUser(token){
        const verified = await this.jwtService.sign(token);
        return verified;
      }
}



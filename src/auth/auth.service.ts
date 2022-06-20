import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentials } from './dto/auth-credentials';
import { JwtPyload } from './jwt-payload.interface';
import { player } from './player.entity';
import { playerRepository } from './player.repository';
import {Like} from "typeorm";
@Injectable()
export class AuthService {
    constructor( 
        @InjectRepository(playerRepository)
        protected PlayerRepository:playerRepository,
        private jwtService:JwtService,
    ){
       // console.log("called !");
    }

    async signUp(AuthCredentials:AuthCredentials) : Promise<player>{
       return this.PlayerRepository.createUser(AuthCredentials);
    }

    async getUsers():Promise<player[]>{
        
        return this.PlayerRepository.getUsers();
    }

   async getUserById(id:number):Promise<player>{return this.PlayerRepository.getUserById(id);}

   async usernameExist(username:string):Promise<player>{return this.PlayerRepository.usernameExist(username);}

    async login(AuthCredentials:AuthCredentials):Promise<{accessToken : string}>{
        const user= await this.PlayerRepository.validateUserPassword(AuthCredentials);
        if (!user)
            throw new UnauthorizedException('Invalid credentials');
       // console.log(result);
        const id = user.id;
        const username = user.username;
       const payload:JwtPyload= {id,username};
       const accessToken = await this.jwtService.sign(payload);
       return {accessToken};
    }

    verifyJwt(jwt: string): Promise<any> {
        return this.jwtService.verifyAsync(jwt);
      }

    async findAllByUsername(username:string):Promise<player[]>{
        return  await this.PlayerRepository.find(
            {where:{username:Like(`%${username}%`) }}
        );
    }

}

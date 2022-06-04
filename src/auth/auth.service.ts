import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentials } from './dto/auth-credentials';
import { JwtPyload } from './jwt-payload.interface';
import { player } from './player.entity';
import { playerRepository } from './player.repository';

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

    async login(AuthCredentials:AuthCredentials):Promise<{accessToken : string}>{
        const username= await this.PlayerRepository.validateUserPassword(AuthCredentials);
        if (!username)
            throw new UnauthorizedException('Invalid credentials');
       // console.log(result);

       const payload:JwtPyload= {username};
       const accessToken = await this.jwtService.sign(payload);
       return {accessToken};
    }
}

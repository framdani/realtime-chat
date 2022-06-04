import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentials } from './dto/auth-credentials';
import { player } from './player.entity';
import { playerRepository } from './player.repository';

@Injectable()
export class AuthService {
    constructor( 
        @InjectRepository(playerRepository)
        protected PlayerRepository:playerRepository,
    ){
       // console.log("called !");
    }

    async signUp(AuthCredentials:AuthCredentials) : Promise<player>{
       return this.PlayerRepository.createUser(AuthCredentials);
    }

    async getUsers():Promise<player[]>{
        
        return this.PlayerRepository.getUsers();
    }

    async login(AuthCredentials:AuthCredentials){
        const result= await this.PlayerRepository.validateUserPassword(AuthCredentials);
        if (!result)
            throw new UnauthorizedException('Invalid credentials');
       // console.log(result);
    }
}

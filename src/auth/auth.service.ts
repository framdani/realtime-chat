import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dto/auth-user';
import { player } from './player.entity';
import { playerRepository } from './player.repository';

@Injectable()
export class AuthService {
    constructor( 
        @InjectRepository(playerRepository)
        protected PlayerRepository:playerRepository,
    ){
        console.log("called !");
    }

    // async signUp(AuthDto:AuthDto) : Promise<player>{
    //    return this.playerRepository.createUser(AuthDto);
    // }

    async getUsers():Promise<player[]>{
        
        return this.PlayerRepository.getUsers();
    }
}

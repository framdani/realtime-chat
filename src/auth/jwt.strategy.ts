import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "jsonwebtoken";
import {Strategy, ExtractJwt} from 'passport-jwt'
import { player } from "./player.entity";
import { playerRepository } from "./player.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(playerRepository)
        private playerRepository:playerRepository,
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51',
        });
    }
    async validate(payload : JwtPayload):Promise<player>{
        const {username} = payload;
        const user = await this.playerRepository.findOne({username});

        if (!user)
            throw new UnauthorizedException();
        
        return user;
    }
}
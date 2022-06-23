import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { roomRepository } from './room.repository';
import { RoomDto } from './dto/room-dto';
import { player } from 'src/auth/player.entity';
import { room } from './room.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(roomRepository)
        protected roomRepo : roomRepository,
    ){

    }
    async createRoom(RoomDto:RoomDto, creators :player[]):Promise<room>{
        return await this.roomRepo.createRoom(RoomDto, creators);
        }
    
        async getRoomsForUser(id:number):Promise<room[]>{
            return await this.roomRepo.getRoomsForUser(id);
        }
    
        // async addUserToRoom(room:room, user:player):Promise<room>{
        //    return await this.roomRepo.addUserToRoom(room, user);
        // }
}

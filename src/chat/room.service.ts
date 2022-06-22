import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { player } from 'src/auth/player.entity';
import { RoomDto } from './dto/room-dto';
import { room } from './room.entity';
import { roomRepository } from './room.repository';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(roomRepository)
        protected roomRepository: roomRepository,
    ){}

    async createRoom(RoomDto:RoomDto, creators :player[]):Promise<room>{
    return await this.roomRepository.createRoom(RoomDto, creators);
    }

    async getRoomsForUser(id:number):Promise<room[]>{
        return await this.roomRepository.getRoomsForUser(id);
    }

    async addUserToRoom(room:room, user:player):Promise<room>{
       return await this.roomRepository.addUserToRoom(room, user);
    }
    //create room
    //add creator to room
    //getroomsfor user
    
}

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

    async createRoom(RoomDto:RoomDto, creator :player):Promise<room>{
    return await this.roomRepository.createRoom(RoomDto, creator);
    }

    async getRoomsForUser(id:number):Promise<room[]>{
        return await this.roomRepository.getRoomsForUser(id);
    }

    //create room
    //add creator to room
    //getroomsfor user
    
}

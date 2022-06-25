import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { roomRepository } from './room.repository';
import { RoomDto } from './dto/room-dto';
import { player } from 'src/auth/player.entity';
import { room } from './room.entity';
import { membership } from './membership.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(roomRepository)
        protected roomRepo : roomRepository,

        @InjectRepository(membership)
        protected membershipRepo:Repository<membership>,
    ){

    }
    async createRoom(RoomDto:RoomDto, creators :player[]):Promise<room>{
        return await this.roomRepo.createRoom(RoomDto, creators);
    }

    async getRoomById(id:number):Promise<room>{
        return await this.roomRepo.getRoomById(id);
    }

    async getRoomsForUser(playerid:number):Promise<room[]>{
        
    //   const query = await this.membershipRepo.createQueryBuilder('membership')
    //   .where('membership.playerid = :playerid', {playerid})
    //   .select(['membership.playerid'])
    //   .getMany();
        const roomsid = await this.membershipRepo
        .createQueryBuilder('p')
        .where('p.playerid = :playerid', { playerid })
        .select(['p.roomid'])
        .getMany();

        const rooms = [];
        /*await this.roomRepo
        .createQueryBuilder('room')
        .where("room.id IN (:...roomsid)", { roomsid })*/
        // console.log(roomsid);
        for (var id of roomsid)
            rooms.push(await this.getRoomById(id.roomid));
       // console.log(rooms);
        return rooms;
        //
    }
    
    async addMember(room:room, creator:player):Promise<void>{
        return await this.roomRepo.addMember(room, creator);
    }

    //createMessage

    //getMessageforChannel

    //joinChannel

    //leaveChannel§ ``
}

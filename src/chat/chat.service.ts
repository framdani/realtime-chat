import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { roomRepository } from './room.repository';
import { RoomDto } from './dto/room-dto';
import { player } from 'src/auth/player.entity';
import { room } from './room.entity';
import { membership } from './membership.entity';
import { Repository } from 'typeorm';
import { RoleStatus } from './dto/membership.model';
import {  message } from './gateway/message.entity';
import { messageDto } from './dto/message-dto';
import { AuthService } from 'src/auth/auth.service';
import { playerRepository } from 'src/auth/player.repository';
import { In } from 'typeorm';
@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(roomRepository)
        protected roomRepo : roomRepository,

        @InjectRepository(membership)
        protected membershipRepo:Repository<membership>,

        @InjectRepository(message)
        protected messageRepo:Repository<message>,

        protected authService:AuthService,
        
    ){

    }
    async createRoom(RoomDto:RoomDto, creators :player[]):Promise<room>{
        return await this.roomRepo.createRoom(RoomDto, creators);
    }

    async getRoomById(id:number):Promise<room>{
        return await this.roomRepo.getRoomById(id);
    }
   

    async getMembersByRoomId(roomid:number):Promise<player[]>{
        const usersid = await this.membershipRepo
        .createQueryBuilder('m')
        .where('m.roomid = :roomid', { roomid })
        .select(['m.playerid'])
        .getMany();

        const members:player[] = [];
        for (var id of usersid)
            members.push(await this.authService.getUserById(id.playerid));
        return members;
    }

    async getRoomsForUser(playerid:number):Promise<room[]>{
        
       //! select * from room INNER JOIN membership ON (membership.playerid=36 and room.id=membership.roomid);
        // const rooms = await this.roomRepo.createQueryBuilder('room')
        // .innerJoin('membership', 'room.id = membership.roomid')
        // .getMany();

         const roomsid = await this.membershipRepo
        .createQueryBuilder('p')
        .where('p.playerid = :playerid', { playerid })
        .select(['p.roomid'])
        .getMany();
        //console.log('faiiiled !');

        let rooms = [];
    
        
        for (var id of roomsid)
            rooms.push(await this.getRoomById(id.roomid));
        return rooms;
        //
    }

    
    async addMember(room:room, creator:player, role:RoleStatus):Promise<void>{
        return await this.roomRepo.addMember(room, creator, role);
    }

    async createMessage(messageDto:messageDto, sender:player):Promise<message>{
        const {id, content} = messageDto;
        const Message = new message();
        Message.content = content;
        Message.player = sender;
        Message.room = await await this.getRoomById(id);
        await Message.save();

        return Message;
    }

    async getMessagesByroomId(roomid:number):Promise<message[]>{
       const query = await this.messageRepo.createQueryBuilder('message')
        .select(['message.content','message.playerid'])
        .where("message.roomid = :roomid", {roomid})
        .orderBy("message.created_at");

       const messages = await query.getMany();
   //    console.log(messages);
       return messages;
    }

    async deleteMmebership(roomid :number, playrid:number){
        await this.membershipRepo.delete(
            {playerid:playrid,roomid:roomid});
    }

    async isMember(roomid:number, playerid:number):Promise<membership>{

        const membership = await this.membershipRepo.findOne({playerid, roomid});
        if (membership)
            return membership
        
            return null;

    }
    //joinChannel

}

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
@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(roomRepository)
        protected roomRepo : roomRepository,

        @InjectRepository(membership)
        protected membershipRepo:Repository<membership>,

        @InjectRepository(message)
        protected messageRepo:Repository<message>,
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
        //console.log('faiiiled !');

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

    //joinChannel

    //leaveChannel§ ``
}

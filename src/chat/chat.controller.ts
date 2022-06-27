import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { timeStamp } from 'console';
import { get } from 'http';
import { ChatService } from './chat.service';
import { RoomDto } from './dto/room-dto';
import { message } from './gateway/message.entity';
import { room } from './room.entity';


@Controller('chat')
export class ChatController {
    constructor( private chatService:ChatService){}

    @Get('room')
    getAllMessageByRoomId(@Query('roomid') roomid:number):Promise<message[]>{
     return this.chatService.getMessagesByroomId(roomid);   

    }

    

}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { timeStamp } from 'console';
import { get } from 'http';
import { ChatService } from './chat.service';
import { RoomDto } from './dto/room-dto';
import { room } from './room.entity';
import { RoomService } from './room.service';

@Controller('chat')
export class ChatController {

    constructor(private roomService:RoomService){}

    

}

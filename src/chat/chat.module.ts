import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { playerRepository } from 'src/auth/player.repository';
import { ChatGateway } from './gateway/chat.gateway';
import { roomRepository } from './room.repository';
import { ChatService } from './chat.service';
import { RoomService } from './room/room.service';


@Module({
  imports:[ TypeOrmModule.forFeature([roomRepository, playerRepository]),],
  providers: [ChatGateway, ChatService, RoomService]
})
export class ChatModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { playerRepository } from 'src/auth/player.repository';
import { ChatGateway } from './gateway/chat.gateway';
import { roomRepository } from './room.repository';
import { ChatService } from './chat.service';
import { RoomService } from './room.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';


@Module({
  imports:[AuthModule, TypeOrmModule.forFeature([roomRepository, playerRepository]),],
  providers: [ChatGateway,], //ChatService, RoomService, JwtStrategy, AuthService],
})

export class ChatModule {}
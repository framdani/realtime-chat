import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { playerRepository } from 'src/auth/player.repository';
import { ChatGateway } from './gateway/chat.gateway';
import { roomRepository } from './room.repository';
import { ChatService } from './chat.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ChatController } from './chat.controller';
import { membership } from './membership.entity';
import { message } from './gateway/message.entity';


@Module({
  imports:[AuthModule, TypeOrmModule.forFeature([roomRepository, playerRepository, membership, message]),],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController], //ChatService, RoomService, JwtStrategy, AuthService],
})

export class ChatModule {}
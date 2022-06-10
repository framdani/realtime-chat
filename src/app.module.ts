import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ChatModule } from './chat/chat.module';
import { playerRepository } from './auth/player.repository';
import { roomRepository } from './chat/room.repository';
import { RoomService } from './room/room.service';
import { RoomService } from './room/room.service';



@Module({
  imports:[
   ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'frontend/dist'), 
  }),
  TypeOrmModule.forRoot(typeOrmConfig),
  AuthModule,
  ChatModule,
  TypeOrmModule.forFeature([playerRepository, roomRepository])
],
  controllers: [],
  providers: [RoomService],
})
export class AppModule {}

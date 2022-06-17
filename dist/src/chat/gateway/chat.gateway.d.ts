import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { player } from 'src/auth/player.entity';
import { RoomDto } from '../dto/room-dto';
import { room } from '../room.entity';
import { RoomService } from '../room.service';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private authService;
    private roomService;
    server: Server;
    user: any[];
    decoded: any;
    title: any[];
    player: player;
    constructor(authService: AuthService, roomService: RoomService);
    afterInit(server: any): void;
    handleConnection(client: Socket): Promise<boolean | void>;
    private disconnect;
    handleDisconnect(client: any): void;
    onCreateRoom(socket: Socket, room: RoomDto): Promise<room>;
}

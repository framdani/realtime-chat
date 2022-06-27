import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { player } from 'src/auth/player.entity';
import { ChatService } from '../chat.service';
import { messageDto } from '../dto/message-dto';
import { RoomDto } from '../dto/room-dto';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private authService;
    private chatService;
    server: Server;
    user: any[];
    decoded: any;
    title: any[];
    player: player;
    players: player[];
    constructor(authService: AuthService, chatService: ChatService);
    afterInit(server: any): void;
    handleConnection(client: Socket): Promise<void>;
    private disconnect;
    handleDisconnect(client: any): void;
    onCreateRoom(socket: Socket, roomdto: RoomDto): Promise<void>;
    onCreateMessage(socket: Socket, messageDto: messageDto): Promise<void>;
}

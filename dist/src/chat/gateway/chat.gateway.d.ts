import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { player } from 'src/auth/player.entity';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private authService;
    server: Server;
    user: any[];
    decoded: any;
    title: any[];
    player: player;
    constructor(authService: AuthService);
    afterInit(server: any): void;
    handleConnection(client: Socket): Promise<void>;
    private disconnect;
    handleDisconnect(client: any): void;
}

import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    user: any[];
    handleMessage(client: any, payload: any): void;
    afterInit(server: any): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: any): void;
}

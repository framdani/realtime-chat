"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../../auth/auth.service");
const room_dto_1 = require("../dto/room-dto");
const room_service_1 = require("../room.service");
let ChatGateway = class ChatGateway {
    constructor(authService, roomService) {
        this.authService = authService;
        this.roomService = roomService;
        this.user = [];
        this.title = [];
    }
    afterInit(server) {
    }
    async handleConnection(client) {
        try {
            this.decoded = client.handshake.headers.authorization.split(" ")[1];
            this.decoded = await this.authService.verifyJwt(this.decoded);
            this.player = await this.authService.getUserById(this.decoded.id);
            if (!this.player) {
                return this.disconnect(client);
            }
            client.data.player = this.player;
            const rooms = await this.roomService.getRoomsForUser(this.decoded.id);
            this.user.push(client);
            this.title.push(`${client.id}`);
            console.log(`On Connnect ... !${client.id} `);
            console.log(rooms);
            return this.server.to(client.id).emit('message', rooms);
        }
        catch (_a) {
            return this.disconnect(client);
        }
    }
    disconnect(socket) {
        socket.emit('Error', new common_1.UnauthorizedException());
        socket.disconnect();
    }
    handleDisconnect(client) {
        console.log(`On Disconnet ... ! ${client.id}`);
    }
    async onCreateRoom(socket, room) {
        console.log(room);
        console.log(socket.data.player);
        return await this.roomService.createRoom(room, socket.data.player);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, room_dto_1.RoomDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onCreateRoom", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origini: 'http://localhost:3000' } }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, room_service_1.RoomService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map
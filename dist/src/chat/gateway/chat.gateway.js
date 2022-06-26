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
const chat_service_1 = require("../chat.service");
const membership_model_1 = require("../dto/membership.model");
const room_dto_1 = require("../dto/room-dto");
let ChatGateway = class ChatGateway {
    constructor(authService, chatService) {
        this.authService = authService;
        this.chatService = chatService;
        this.user = [];
        this.title = [];
        this.players = [];
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
            const rooms = await this.chatService.getRoomsForUser(this.decoded.id);
            this.user.push(client);
            this.title.push(`${client.id}`);
            console.log(`On Connnect ... !${client.id} ${this.player.username}`);
            return this.server.to(client.id).emit('message', rooms);
        }
        catch (_a) {
            console.log('last catch');
            return this.disconnect(client);
        }
    }
    disconnect(socket) {
        socket.emit('Error', new common_1.UnauthorizedException());
        socket.disconnect();
    }
    handleDisconnect(client) {
        this.user.splice(this.user.indexOf(`${client}`), 1);
        console.log(`On Disconnet ... ! ${client.id}`);
    }
    async onCreateRoom(socket, roomdto) {
        const usernames = roomdto.players;
        for (var username of usernames) {
            console.log(username);
            const user = await this.authService.getUserByUsername(username);
            if (user)
                this.players.push(user);
        }
        const room = await this.chatService.createRoom(roomdto, this.players);
        await this.chatService.addMember(room, socket.data.player, membership_model_1.RoleStatus.OWNER);
        const rooms = await this.chatService.getRoomsForUser(this.decoded.id);
        for (var x of this.user) {
            console.log(`the connected users  ${x.id}`);
            this.server.to(x.id).emit('message', rooms);
        }
        this.players.splice(0);
    }
    async onCreateMessage() {
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
__decorate([
    (0, websockets_1.SubscribeMessage)('createMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onCreateMessage", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origini: 'http://localhost:3000' } }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, chat_service_1.ChatService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map
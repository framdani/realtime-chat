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
let ChatGateway = class ChatGateway {
    constructor(authService) {
        this.authService = authService;
        this.user = [];
        this.title = [];
    }
    afterInit(server) {
    }
    async handleConnection(client) {
        try {
            this.decoded = client.handshake.headers.authorization.split(" ")[1];
            this.decoded = await this.authService.verifyJwt(this.decoded);
            this.player = await this.authService.getUserById(this.decoded.username);
            if (!this.player)
                return this.disconnect(client);
            this.user.push(client);
            this.title.push(`${client.id}`);
            console.log(`On Connnect ... !${client.id} `);
            this.server.emit('message', this.title);
            console.log("sent");
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
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origini: 'http://localhost:3000' } }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map
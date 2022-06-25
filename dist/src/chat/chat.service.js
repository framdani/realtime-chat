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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const room_repository_1 = require("./room.repository");
const membership_entity_1 = require("./membership.entity");
const typeorm_2 = require("typeorm");
let ChatService = class ChatService {
    constructor(roomRepo, membershipRepo) {
        this.roomRepo = roomRepo;
        this.membershipRepo = membershipRepo;
    }
    async createRoom(RoomDto, creators) {
        return await this.roomRepo.createRoom(RoomDto, creators);
    }
    async getRoomById(id) {
        return await this.roomRepo.getRoomById(id);
    }
    async getRoomsForUser(playerid) {
        const roomsid = await this.membershipRepo
            .createQueryBuilder('p')
            .where('p.playerid = :playerid', { playerid })
            .select(['p.roomid'])
            .getMany();
        const rooms = [];
        for (var id of roomsid)
            rooms.push(await this.getRoomById(id.roomid));
        return rooms;
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_repository_1.roomRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(membership_entity_1.membership)),
    __metadata("design:paramtypes", [room_repository_1.roomRepository,
        typeorm_2.Repository])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map
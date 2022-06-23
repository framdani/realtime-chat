"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRepository = void 0;
const room_entity_1 = require("./room.entity");
const typeorm_1 = require("typeorm");
const membership_entity_1 = require("./membership.entity");
const membership_model_1 = require("./dto/membership.model");
let roomRepository = class roomRepository extends typeorm_1.Repository {
    async createRoom(RoomDto, creators) {
        const { name, password } = RoomDto;
        const Room = new room_entity_1.room();
        Room.name = name;
        Room.isChannel = true;
        if (password)
            Room.isPublic = false;
        Room.password = password;
        await Room.save();
        for (var user of creators) {
            const Membership = new membership_entity_1.membership();
            Membership.Role = membership_model_1.RoleStatus.USER;
            Membership.player = user;
            Membership.room = Room;
            await Membership.save();
        }
        return Room;
    }
    async getRoomsForUser(playerid) {
        const query = this.createQueryBuilder('room')
            .leftJoin('room.players', 'player')
            .where('player.id = :playerid', { playerid });
        const rooms = await query.getMany();
        return rooms;
    }
};
roomRepository = __decorate([
    (0, typeorm_1.EntityRepository)(room_entity_1.room)
], roomRepository);
exports.roomRepository = roomRepository;
//# sourceMappingURL=room.repository.js.map
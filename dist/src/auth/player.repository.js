"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerRepository = void 0;
const typeorm_1 = require("typeorm");
const player_entity_1 = require("./player.entity");
let playerRepository = class playerRepository extends typeorm_1.Repository {
    async createUser(AuthDto) {
        const { username, password } = AuthDto;
        const User = new player_entity_1.player();
        User.username = username;
        User.password = password;
        await User.save();
        return User;
    }
    async getUsers() {
        const query = this.createQueryBuilder('player');
        const users = await query.getMany();
        return users;
    }
};
playerRepository = __decorate([
    (0, typeorm_1.EntityRepository)(player_entity_1.player)
], playerRepository);
exports.playerRepository = playerRepository;
//# sourceMappingURL=player.repository.js.map
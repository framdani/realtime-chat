"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const player_entity_1 = require("./player.entity");
let playerRepository = class playerRepository extends typeorm_1.Repository {
    async createUser(AuthCredentials) {
        const { username, password } = AuthCredentials;
        const User = new player_entity_1.player();
        User.username = username;
        User.password = password;
        try {
            await User.save();
            return User;
        }
        catch (error) {
            if (error.code === '23505')
                throw new common_1.ConflictException('Username already exists');
            else
                throw new common_1.InternalServerErrorException();
        }
    }
    async getUsers() {
        const query = this.createQueryBuilder('player');
        const users = await query.getMany();
        return users;
    }
    async validateUserPassword(AuthCredentials) {
        const { username, password } = AuthCredentials;
        const user = await this.findOne({ username });
        if (user && await user.validatePassword(password)) {
            return user;
        }
        else {
            return null;
        }
    }
    async getUserById(id) {
        const user = await this.findOne({ id });
        if (user)
            return user;
        return null;
    }
    async getUserByUsername(username) {
        const user = await this.findOne({ username });
        if (user)
            return user;
        return null;
    }
};
playerRepository = __decorate([
    (0, typeorm_1.EntityRepository)(player_entity_1.player)
], playerRepository);
exports.playerRepository = playerRepository;
//# sourceMappingURL=player.repository.js.map
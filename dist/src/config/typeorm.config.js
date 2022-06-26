"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const player_entity_1 = require("../auth/player.entity");
const message_entity_1 = require("../chat/gateway/message.entity");
const membership_entity_1 = require("../chat/membership.entity");
const room_entity_1 = require("../chat/room.entity");
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'framdani',
    password: '1237',
    database: 'chat',
    entities: [player_entity_1.player, room_entity_1.room, membership_entity_1.membership, message_entity_1.message],
    synchronize: true,
    autoLoadEntities: true,
};
//# sourceMappingURL=typeorm.config.js.map
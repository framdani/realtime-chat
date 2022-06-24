import { player } from "src/auth/player.entity";
import { BaseEntity } from "typeorm";
import { RoleStatus } from "./dto/membership.model";
import { room } from "./room.entity";
export declare class membership extends BaseEntity {
    id_membership: number;
    role: RoleStatus;
    player: player;
    room: room;
}

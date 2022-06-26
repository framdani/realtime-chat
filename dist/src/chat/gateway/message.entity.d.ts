import { player } from "src/auth/player.entity";
import { BaseEntity } from "typeorm";
import { room } from "../room.entity";
export declare class message extends BaseEntity {
    id: number;
    content: string;
    created_at: Date;
    room: room;
    player: player;
}

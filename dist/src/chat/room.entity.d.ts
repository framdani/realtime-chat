import { player } from "src/auth/player.entity";
import { BaseEntity } from "typeorm";
export declare class room extends BaseEntity {
    id: number;
    name: string;
    isChannel: boolean;
    isPublic: boolean;
    password: string;
    players: player[];
    create_at: Date;
    updated_at: Date;
}

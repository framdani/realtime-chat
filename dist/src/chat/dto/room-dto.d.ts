import { player } from "src/auth/player.entity";
export declare class RoomDto {
    name: string;
    password: string;
    players: player[];
    created_at: Date;
    updated_at: Date;
}

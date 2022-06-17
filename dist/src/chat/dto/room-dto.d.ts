import { player } from "src/auth/player.entity";
export declare class RoomDto {
    id: number;
    name: string;
    isChannel: boolean;
    isPublic: boolean;
    password: string;
    players: player[];
    created_at: Date;
    updated_at: Date;
}

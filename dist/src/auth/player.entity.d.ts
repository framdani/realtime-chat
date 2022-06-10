import { room } from "src/chat/room.entity";
import { BaseEntity } from "typeorm";
export declare class player extends BaseEntity {
    id: number;
    username: string;
    password: string;
    rooms: room[];
    validatePassword(password: string): Promise<boolean>;
}

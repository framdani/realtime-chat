import { room } from "./room.entity";
import { Repository } from "typeorm";
export declare class roomRepository extends Repository<room> {
    createRoom(): Promise<void>;
    getRooms(): Promise<void>;
    updateRoom(): Promise<void>;
}

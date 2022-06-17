import { room } from "./room.entity";
import { Repository } from "typeorm";
import { RoomDto } from "./dto/room-dto";
import { player } from "src/auth/player.entity";
export declare class roomRepository extends Repository<room> {
    createRoom(RoomDto: RoomDto, creator: player): Promise<room>;
    getRoomsForUser(playerid: number): Promise<room[]>;
}

import { room } from "./room.entity";
import { Repository } from "typeorm";
import { RoomDto } from "./dto/room-dto";
import { player } from "src/auth/player.entity";
import { RoleStatus } from "./dto/membership.model";
export declare class roomRepository extends Repository<room> {
    createRoom(RoomDto: RoomDto, creators: player[]): Promise<room>;
    addMember(room: room, creator: player, role: RoleStatus): Promise<void>;
    getRoomById(id: number): Promise<room>;
    getRoomsForUser(playerid: number): Promise<void>;
}

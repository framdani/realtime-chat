import { room } from "./room.entity";
import { Repository } from "typeorm";
import { RoomDto } from "./dto/room-dto";
export declare class roomRepository extends Repository<room> {
    createRoom(RoomDto: RoomDto): Promise<room>;
}

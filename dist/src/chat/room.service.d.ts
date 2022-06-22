import { player } from 'src/auth/player.entity';
import { RoomDto } from './dto/room-dto';
import { room } from './room.entity';
import { roomRepository } from './room.repository';
export declare class RoomService {
    protected roomRepository: roomRepository;
    constructor(roomRepository: roomRepository);
    createRoom(RoomDto: RoomDto, creators: player[]): Promise<room>;
    getRoomsForUser(id: number): Promise<room[]>;
    addUserToRoom(room: room, user: player): Promise<room>;
}

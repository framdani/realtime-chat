import { roomRepository } from './room.repository';
import { RoomDto } from './dto/room-dto';
import { player } from 'src/auth/player.entity';
import { room } from './room.entity';
export declare class ChatService {
    protected roomRepo: roomRepository;
    constructor(roomRepo: roomRepository);
    createRoom(RoomDto: RoomDto, creators: player[]): Promise<room>;
    getRoomsForUser(id: number): Promise<room[]>;
}

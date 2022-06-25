import { roomRepository } from './room.repository';
import { RoomDto } from './dto/room-dto';
import { player } from 'src/auth/player.entity';
import { room } from './room.entity';
import { membership } from './membership.entity';
import { Repository } from 'typeorm';
export declare class ChatService {
    protected roomRepo: roomRepository;
    protected membershipRepo: Repository<membership>;
    constructor(roomRepo: roomRepository, membershipRepo: Repository<membership>);
    createRoom(RoomDto: RoomDto, creators: player[]): Promise<room>;
    getRoomById(id: number): Promise<room>;
    getRoomsForUser(playerid: number): Promise<room[]>;
}

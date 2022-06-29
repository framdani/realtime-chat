import { roomRepository } from './room.repository';
import { RoomDto } from './dto/room-dto';
import { player } from 'src/auth/player.entity';
import { room } from './room.entity';
import { membership } from './membership.entity';
import { Repository } from 'typeorm';
import { RoleStatus } from './dto/membership.model';
import { message } from './gateway/message.entity';
import { messageDto } from './dto/message-dto';
export declare class ChatService {
    protected roomRepo: roomRepository;
    protected membershipRepo: Repository<membership>;
    protected messageRepo: Repository<message>;
    constructor(roomRepo: roomRepository, membershipRepo: Repository<membership>, messageRepo: Repository<message>);
    createRoom(RoomDto: RoomDto, creators: player[]): Promise<room>;
    getRoomById(id: number): Promise<room>;
    getRoomsForUser(playerid: number): Promise<room[]>;
    addMember(room: room, creator: player, role: RoleStatus): Promise<void>;
    createMessage(messageDto: messageDto, sender: player): Promise<message>;
    getMessagesByroomId(roomid: number): Promise<message[]>;
    deleteMmebership(roomid: number, playrid: number): Promise<void>;
    isMember(roomid: number, playerid: number): Promise<membership>;
}

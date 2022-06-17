import { room } from "./room.entity";
import { EntityRepository, Repository } from "typeorm";
import { RoomDto } from "./dto/room-dto";
import { player } from "src/auth/player.entity";

@EntityRepository(room)
export class roomRepository extends Repository<room>{

    async createRoom(RoomDto:RoomDto, creator : player):Promise<room>{

        const {name, isChannel,isPublic,password} = RoomDto;

        const Room = new room();
        Room.name = name;
        Room.isChannel = isChannel;
        Room.isPublic = isPublic;
        Room.password = password;
        Room.players.push(creator);


        await Room.save();

        return Room;
    }

    // async addCreatorToRoom(room:RoomDto, creator:player):Promise<room>{
    //     room.players.push(creator);
    //     return room;
    // }

    async getRoomsForUser(playerid:number):Promise<room[]>{
       const query = this.createQueryBuilder('room')
       .leftJoin('room.players', 'player')
       .where('player.id = :playerid', {playerid})

       const rooms = await query.getMany();

       return rooms;

    }

}
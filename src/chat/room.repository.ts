import { room } from "./room.entity";
import { EntityRepository, Repository } from "typeorm";
import { RoomDto } from "./dto/room-dto";
import { player } from "src/auth/player.entity";

@EntityRepository(room)
export class roomRepository extends Repository<room>{

    async createRoom(RoomDto:RoomDto, creators : player[]):Promise<room>{

        const {name,password} = RoomDto;

        const Room = new room();
        Room.name = name;
        Room.isChannel = true;
        if (password)
            Room.isPublic = false;
        Room.password = password;
        Room.players = creators;
        console.log(Room.players);


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

    async addUserToRoom(room:room, user:player):Promise<room>{
        await room.players.push(user);
        return room;
    }

}

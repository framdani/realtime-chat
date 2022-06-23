import { room } from "./room.entity";
import { EntityRepository, Repository } from "typeorm";
import { RoomDto } from "./dto/room-dto";
import { player } from "src/auth/player.entity";
import { memoryUsage } from "process";
import { membership } from "./membership.entity";
import { RoleStatus } from "./dto/membership.model";

@EntityRepository(room)
export class roomRepository extends Repository<room>{

    async createRoom(RoomDto:RoomDto, creators : player[]):Promise<room>{
        //update room entity 
        //update player entity => user already exist
        //update membership entity => new one


        const {name,password} = RoomDto;

        const Room = new room();
        Room.name = name;
        Room.isChannel = true;
        if (password)
            Room.isPublic = false;
        Room.password = password;
        await Room.save();

        for (var user of creators)
        {
            const Membership = new membership();
            Membership.Role = RoleStatus.USER;
            Membership.player = user;
            Membership.room = Room;
            await Membership.save();
        }
        //update the last one to be the owner

        // const Membership1 = new membership();
        // Membership1.Role = RoleStatus.USER;
        // Membership1.player = creators[0];
        // Membership1.room = Room;
        // await Membership1.save();

        // const Membership2 = new membership();
        // Membership2.Role = RoleStatus.USER;
        // Membership2.player = creators[1];
        // Membership2.room = Room;
        // await Membership2.save();

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

    // async addUserToRoom(room:room, user:player):Promise<room>{
    //     await room.players.push(user);
    //     return room;
    // }

}

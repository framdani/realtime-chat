import { room } from "./room.entity";
import { EntityRepository, Repository } from "typeorm";
import { RoomDto } from "./dto/room-dto";

@EntityRepository(room)
export class roomRepository extends Repository<room>{

    async createRoom(RoomDto:RoomDto):Promise<room>{

        const {name} = RoomDto;

        const Room = new room();
        Room.name = name;

        

        return Room;
    }

}
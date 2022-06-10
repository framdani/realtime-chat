import { room } from "./room.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(room)
export class roomRepository extends Repository<room>{

  async createRoom(){}

  async getRooms(){}

  async updateRoom(){}
}
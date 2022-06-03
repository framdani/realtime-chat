import { getCustomRepositoryToken } from "@nestjs/typeorm";
import { EntityRepository, Repository } from "typeorm";
import { AuthDto } from "./dto/auth-user";
import { player } from "./player.entity";

@EntityRepository(player)
export class playerRepository extends Repository<player>{

    async createUser(AuthDto:AuthDto) : Promise<player>{

        const {username, password} = AuthDto;

        const User = new player();

        User.username = username;
        User.password = password;

        await User.save();

        return User;
    }

    async getUsers():Promise<player[]>{

        const query = this.createQueryBuilder('player');

        const users= await query.getMany();
        return users;
    }

    //createUser()

    //getUser()

    //getAllUsers()
}
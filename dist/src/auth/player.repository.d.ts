import { Repository } from "typeorm";
import { AuthDto } from "./dto/auth-user";
import { player } from "./player.entity";
export declare class playerRepository extends Repository<player> {
    createUser(AuthDto: AuthDto): Promise<player>;
    getUsers(): Promise<player[]>;
}

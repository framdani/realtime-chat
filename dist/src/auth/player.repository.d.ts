import { Repository } from "typeorm";
import { AuthCredentials } from "./dto/auth-credentials";
import { player } from "./player.entity";
export declare class playerRepository extends Repository<player> {
    createUser(AuthCredentials: AuthCredentials): Promise<player>;
    getUsers(): Promise<player[]>;
    validateUserPassword(AuthCredentials: AuthCredentials): Promise<player>;
    getUserById(id: number): Promise<player>;
    getUserByUsername(username: string): Promise<player>;
}

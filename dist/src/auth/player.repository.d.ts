import { Repository } from "typeorm";
import { AuthCredentials } from "./dto/auth-credentials";
import { player } from "./player.entity";
export declare class playerRepository extends Repository<player> {
    createUser(AuthCredentials: AuthCredentials): Promise<player>;
    getUsers(): Promise<player[]>;
    validateUserPassword(AuthCredentials: AuthCredentials): Promise<player>;
    getUserById(id: number): Promise<player>;
<<<<<<< HEAD
    getUserByUsername(username: string): Promise<player>;
=======
    usernameExist(username: string): Promise<player>;
>>>>>>> a69de9081eb4922bb6672fc30697ce955a970dfe
}

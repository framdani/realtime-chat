import { AuthCredentials } from './dto/auth-credentials';
import { player } from './player.entity';
import { playerRepository } from './player.repository';
export declare class AuthService {
    protected PlayerRepository: playerRepository;
    constructor(PlayerRepository: playerRepository);
    signUp(AuthCredentials: AuthCredentials): Promise<player>;
    getUsers(): Promise<player[]>;
    login(AuthCredentials: AuthCredentials): Promise<void>;
}

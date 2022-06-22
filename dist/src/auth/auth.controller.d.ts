import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth-credentials';
import { player } from './player.entity';
export declare class AuthController {
    private AuthService;
    constructor(AuthService: AuthService);
    getUsers(): Promise<player[]>;
    findAllByUsername(username: string): Promise<player[]>;
    createUser(AuthCredentials: AuthCredentials): Promise<player>;
    login(AuthCredentials: AuthCredentials): Promise<{
        accessToken: string;
    }>;
}

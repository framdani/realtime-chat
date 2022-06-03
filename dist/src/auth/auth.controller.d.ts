import { AuthService } from './auth.service';
import { player } from './player.entity';
export declare class AuthController {
    private AuthService;
    constructor(AuthService: AuthService);
    getUsers(): Promise<player[]>;
}

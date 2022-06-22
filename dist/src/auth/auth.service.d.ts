import { JwtService } from '@nestjs/jwt';
import { AuthCredentials } from './dto/auth-credentials';
import { player } from './player.entity';
import { playerRepository } from './player.repository';
export declare class AuthService {
    protected PlayerRepository: playerRepository;
    private jwtService;
    constructor(PlayerRepository: playerRepository, jwtService: JwtService);
    signUp(AuthCredentials: AuthCredentials): Promise<player>;
    getUsers(): Promise<player[]>;
    getUserById(id: number): Promise<player>;
<<<<<<< HEAD
    getUserByUsername(username: string): Promise<player>;
=======
    usernameExist(username: string): Promise<player>;
>>>>>>> a69de9081eb4922bb6672fc30697ce955a970dfe
    login(AuthCredentials: AuthCredentials): Promise<{
        accessToken: string;
    }>;
    verifyJwt(jwt: string): Promise<any>;
    findAllByUsername(username: string): Promise<player[]>;
}

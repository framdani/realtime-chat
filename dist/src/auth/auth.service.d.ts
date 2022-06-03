import { player } from './player.entity';
import { playerRepository } from './player.repository';
export declare class AuthService {
    protected PlayerRepository: playerRepository;
    constructor(PlayerRepository: playerRepository);
    getUsers(): Promise<player[]>;
}

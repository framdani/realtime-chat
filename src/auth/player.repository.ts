import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { getCustomRepositoryToken } from "@nestjs/typeorm";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentials } from "./dto/auth-credentials";
import { player } from "./player.entity";

@EntityRepository(player)
export class playerRepository extends Repository<player>{

    async createUser(AuthCredentials:AuthCredentials) : Promise<player>{

        const {username, password} = AuthCredentials;

        const User = new player();

        User.username = username;//.toLowerCase();
        User.password = password;
       // await User.save();

        try{
         await User.save();return User;
        }catch(error){
            if (error.code === '23505')
                throw new ConflictException('Username already exists');
            else
                throw new InternalServerErrorException();
        }

        
    }

    async getUsers():Promise<player[]>{

        const query = this.createQueryBuilder('player');

        const users= await query.getMany();
        return users;
    }

    async validateUserPassword(AuthCredentials:AuthCredentials):Promise<player>{
        const {username, password} = AuthCredentials;

        const user = await this.findOne({username});

        // console.log(username);
        // console.log(password);
        if (user && await user.validatePassword(password)){
            return user;
        }else{
            return null;
        }
          
    }

    async getUserById(id:number):Promise<player>{
        const user = await this.findOne({id});

        if (user)
            return user;
        return null;
    }

    async getUserByUsername(username:string):Promise<player>{
        const user = await this.findOne({username});

        if (user)
            return user;
        return null;
    }

    //createUser()

    //getUser()

    //getAllUsers()
}
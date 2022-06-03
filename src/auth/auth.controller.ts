import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-user';
import { player } from './player.entity';

@Controller('/chat')
export class AuthController {

    constructor (private AuthService:AuthService){}

    @Get('/users')
    getUsers():Promise<player[]>{
        return this.AuthService.getUsers();
    }

    // @Post('/signup')
    // createUser(@Body() AuthDto:AuthDto):Promise<player>{
    //    return this.AuthService.signUp(AuthDto);     
    // }
}

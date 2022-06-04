import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth-credentials';
import { player } from './player.entity';
import {AuthGuard} from '@nestjs/passport'
@Controller()
export class AuthController {

    constructor (private AuthService:AuthService){}

    @Get('users')
   //@UseGuards(AuthGuard())
    getUsers():Promise<player[]>{
        return this.AuthService.getUsers();
    }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    createUser(@Body() AuthCredentials:AuthCredentials):Promise<player>{
       return this.AuthService.signUp(AuthCredentials);     
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    login(@Body() AuthCredentials:AuthCredentials):Promise<{accessToken : string}>{
        return this.AuthService.login(AuthCredentials);
    }
}
  
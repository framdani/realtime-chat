import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth-credentials';
import { player } from './player.entity';
import {AuthGuard} from '@nestjs/passport'
@Controller()
export class AuthController {

    constructor (private AuthService:AuthService){}
    
    @UseGuards(AuthGuard())
    @Get('/users')
    getUsers():Promise<player[]>{
        return this.AuthService.getUsers();
    }

    @Get('/find-by-username')
    findAllByUsername(@Query('username') username:string):Promise<player[]>{
        return this.AuthService.findAllByUsername(username);
    }

    @Post('/signup')
    @UsePipes(ValidationPipe)
   // @UseGuards(AuthGuard())
    createUser(@Body() AuthCredentials:AuthCredentials):Promise<player>{
       return this.AuthService.signUp(AuthCredentials);     
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() AuthCredentials:AuthCredentials):Promise<{accessToken : string}>{
        return this.AuthService.login(AuthCredentials);
    }
}
  
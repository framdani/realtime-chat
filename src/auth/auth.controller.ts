import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth-credentials';
import { player } from './player.entity';

@Controller('auth')
export class AuthController {

    constructor (private AuthService:AuthService){}

    @Get('users')
    getUsers():Promise<player[]>{
        return this.AuthService.getUsers();
    }

    @Post('signup')
    @UsePipes(ValidationPipe)
    createUser(@Body() AuthCredentials:AuthCredentials):Promise<player>{
       return this.AuthService.signUp(AuthCredentials);     
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    login(@Body() AuthCredentials:AuthCredentials){
        return this.AuthService.login(AuthCredentials);
    }
}
  
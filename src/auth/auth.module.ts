import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { playerRepository } from './player.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule} from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports:[ 
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register(
      {
        secret:'topSecret51',
        signOptions:{
          expiresIn : 3600,  
        }
      }
    ),
    TypeOrmModule.forFeature([playerRepository]),],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports:[
    JwtStrategy,
    PassportModule,
  ],
})
export class AuthModule {}

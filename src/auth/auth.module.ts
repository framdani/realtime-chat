import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { playerRepository } from './player.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule} from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy';
import { roomRepository } from 'src/chat/room.repository';
import { membership } from 'src/chat/membership.entity';
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
    TypeOrmModule.forFeature([playerRepository, roomRepository, membership]),],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    AuthService,
  ],
  exports:[
   // JwtStrategy,
    //PassportModule,
    AuthService
  ],
})
export class AuthModule {}

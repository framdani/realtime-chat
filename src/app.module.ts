import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';



@Module({
  imports:
   [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'frontend/dist'), 
  }),
  TypeOrmModule.forRoot(typeOrmConfig),
  AuthModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}

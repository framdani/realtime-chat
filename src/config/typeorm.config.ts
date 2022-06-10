import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { player } from "src/auth/player.entity";
import { room } from "src/chat/room.entity";

export const typeOrmConfig : TypeOrmModuleOptions = {
    type:'postgres',
    host:'localhost',
    port: 5432,
    username:'framdani',
    password:'1237',
    database:'chat',
   // entities:[__dirname+'../**/*.entity.ts'],
    entities:[player, room],
    synchronize : true,
    autoLoadEntities: true,
};
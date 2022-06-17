import { IsNotEmpty, IsOptional } from "class-validator";
import { player } from "src/auth/player.entity";

export class RoomDto{

   // @IsNotEmpty()
   // id:number;
    name:string;
    
    isChannel:boolean;
    isPublic:boolean;
    password:string;

    players:player[];
    created_at:Date;
    updated_at:Date;


    
   // @IsNotEmpty()
  //   isChannel:boolean;

  //  // @IsNotEmpty()
  //   isPublic:boolean;

  // //  @IsOptional()
  //   password:string;
}
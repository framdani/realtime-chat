import { IsNotEmpty } from "class-validator";

export class AuthCredentials{

    id:number;
    
    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    password:string;//yawdi yawdi 
}
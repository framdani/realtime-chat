import { join } from "path";
import { room } from "src/chat/room.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class player extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    username:string;

    @Column()//{select:false}
    password:string;

    @ManyToMany(()=> room, channel=>channel.players)
  //  @JoinTable()
    rooms:room[];

    async validatePassword(password:string):Promise<boolean> {
        return password === this.password;
    }

}
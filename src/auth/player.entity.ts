import { join } from "path";
import { message } from "src/chat/gateway/message.entity";
import { membership } from "src/chat/membership.entity";
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

  //   @ManyToMany(()=> room, channel=>channel.players)
  // //  @JoinTable()
  //   rooms:room[];

    @OneToMany(()=> membership, membership=>membership.player)
    memberships : membership[];

    @OneToMany(()=>message, message=> message.player)
    messages:message[];


    async validatePassword(password:string):Promise<boolean> {
        return password === this.password;
    }

}
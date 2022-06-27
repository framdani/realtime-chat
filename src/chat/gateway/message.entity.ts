import { player } from "src/auth/player.entity";
import { BaseEntity, Column, Entity,OneToMany, PrimaryGeneratedColumn, ManyToOne,JoinColumn, CreateDateColumn, UpdateDateColumn,  JoinTable} from "typeorm";
import { room } from "../room.entity";

@Entity()
export class message extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    content:string;

    @CreateDateColumn()
    created_at:Date;

    @Column({ name: 'playerid' })
    playerid: number;

    @Column({ name: 'roomid' })
    roomid: number;

    @ManyToOne(()=> room, room=> room.messages)
    @JoinColumn({name:"roomid"})
    room:room;

    @ManyToOne(()=> player, player=>player.messages)
    @JoinColumn({name:"playerid"})
    player:player;
}
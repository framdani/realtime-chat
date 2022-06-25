import { player } from "src/auth/player.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn,ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn,  JoinTable, JoinColumn} from "typeorm";
import { RoleStatus } from "./dto/membership.model";
import { room } from "./room.entity";

@Entity()
export class membership extends BaseEntity{

    @PrimaryGeneratedColumn()
    id_membership:number;

    @Column()
    role:RoleStatus;

    @Column({ name: 'playerid' })
    playerid: number;

    @ManyToOne(()=> player, player=>player.memberships)
    @JoinColumn({ name: "playerid" })
    player: player;

    @Column({ name: 'roomid' })
    roomid: number;
    
    @ManyToOne(()=> room, room=>room.memberships)
    @JoinColumn({ name:"roomid"})
    room:room;
}
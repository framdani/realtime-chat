import { player } from "src/auth/player.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn,ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn,  JoinTable} from "typeorm";
import { RoleStatus } from "./dto/membership.model";
import { room } from "./room.entity";

@Entity()
export class membership extends BaseEntity{

    @PrimaryGeneratedColumn()
    id_membership:number;

    @Column()
    Role:RoleStatus;

    @ManyToOne(()=> player, player=>player.memberships)
    player:player;

    @ManyToOne(()=> room, room=>room.memberships)
    room:room;
}
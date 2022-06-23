import { player } from "src/auth/player.entity";
import { BaseEntity, Column, Entity,OneToMany, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn,  JoinTable} from "typeorm";
import { membership } from "./membership.entity";

@Entity()
export class room extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    name:string;

    @Column({default:true})
    isChannel:boolean;

    @Column({default:true})
    isPublic:boolean;

    @Column()//{select:false}
    password:string;

    // @ManyToMany(()=>player)
    // @JoinTable()
    // players:player[];
    @OneToMany(()=>membership, membership=>membership.room)
    memberships:membership[];

    @CreateDateColumn()
    create_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    

}
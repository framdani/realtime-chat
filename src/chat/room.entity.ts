import { player } from "src/auth/player.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn,  JoinTable} from "typeorm";

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

    @ManyToMany(()=>player)
    @JoinTable()
    players:player[];

    @CreateDateColumn()
    create_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    

}
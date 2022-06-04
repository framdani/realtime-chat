import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class player extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    username:string;

    @Column()//{select:false}
    password:string;

    async validatePassword(password:string):Promise<boolean> {
        return password === this.password;
    }

}
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class player extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    password:string;

}
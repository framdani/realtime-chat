import { BaseEntity } from "typeorm";
export declare class player extends BaseEntity {
    id: number;
    username: string;
    password: string;
    validatePassword(password: string): Promise<boolean>;
}

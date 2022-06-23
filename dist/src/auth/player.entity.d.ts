import { membership } from "src/chat/membership.entity";
import { BaseEntity } from "typeorm";
export declare class player extends BaseEntity {
    id: number;
    username: string;
    password: string;
    memberships: membership[];
    validatePassword(password: string): Promise<boolean>;
}

import { IUser } from "src/interfaces/user.interface";
import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity } from 'typeorm';

// Entidad 'users'
@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser { // Extendiendo la entidad abstracta 'BaseEntity' con sus propiedades

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    role: string;
}
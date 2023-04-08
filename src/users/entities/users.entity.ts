import { Column, Entity, OneToMany  } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IUser } from '../../interfaces/user.interface';
import { BaseEntity } from '../../config/base.entity';
import { ROLES } from '../../constants/roles';
import { UsersProjectsEntity } from "./usersProjects.entity";

// Entidad 'users'
@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser { // Extendiendo la entidad abstracta 'BaseEntity' con sus propiedades

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Exclude() // Excluir este campo
    @Column()
    password: string;

    @Column({ type: 'enum', enum: ROLES })
    role: ROLES;

    // Relación '1 a muchos' con 'UsersProjects'
    @OneToMany(() => UsersProjectsEntity, (usersProjects) => usersProjects.user)
    projectsIncludes: UsersProjectsEntity[];
}
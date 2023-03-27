import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ACCESS_LEVEL } from '../../constants/roles';
import { UsersEntity } from './users.entity';
import { ProjectsEntity } from '../../projects/entities/projects.entity';

// Entidad 'Custom' entre 'users' & 'projects'
@Entity({ name: 'users_projects' })
export class UsersProjectsEntity extends BaseEntity { // Extendiendo la entidad abstracta 'BaseEntity' con sus propiedades

    @Column({ type: 'enum', enum: ACCESS_LEVEL })
    accessLevel: ACCESS_LEVEL;

    // Relación 'Muchos a 1' con 'Users'
    @ManyToOne(()=> UsersEntity, (user)=> user.projectsIncludes)
    user: UsersEntity;

    // Relación 'Muchos a 1' con 'Projects'
    @ManyToOne(() => ProjectsEntity, (project)=> project.usersIncludes)
    project: ProjectsEntity;
}
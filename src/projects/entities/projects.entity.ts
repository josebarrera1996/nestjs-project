import { IProject } from '../../interfaces/project.interface';
import { BaseEntity } from '../../config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UsersProjectsEntity } from '../../users/entities/usersProjects.entity';
import { TasksEntity } from '../../tasks/entities/tasks.entity';

// Entidad 'projects'
@Entity({ name: 'projects' })
export class ProjectsEntity extends BaseEntity implements IProject { // Extendiendo la entidad abstracta 'BaseEntity' con sus propiedades

  @Column()
  name: string;
  
  @Column()
  description: string;

  // Relación '1 a Muchos' con 'UsersProjects'
  @OneToMany(() => UsersProjectsEntity, (usersProjects) => usersProjects.project)
  usersIncludes: UsersProjectsEntity[];

  // Relación '1 a Muchos' con 'Tasks'
  @OneToMany(()=> TasksEntity, (tasks) => tasks.project)
  tasks: TasksEntity[];
}
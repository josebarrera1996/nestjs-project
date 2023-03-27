import { IProject } from 'src/interfaces/project.interface';
import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity } from 'typeorm';

// Entidad 'projects'
@Entity({ name: 'projects' })
export class UsersEntity extends BaseEntity implements IProject { // Extendiendo la entidad abstracta 'BaseEntity' con sus propiedades

  @Column()
  name: string;
  
  @Column()
  description: string;
}
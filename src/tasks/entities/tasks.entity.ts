import { STATUS_TASK } from '../../constants/status-task';
import { ProjectsEntity } from '../../projects/entities/projects.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

// Entidad 'tasks'
@Entity({ name: 'task' })
export class TasksEntity extends BaseEntity {
    
    @Column()
    taskName: string;

    @Column()
    taskDescription: string;

    @Column({ type: 'enum', enum: STATUS_TASK })
    status: STATUS_TASK;

    @Column()
    responsableName: string;
    
    // Relación 'Muchos a 1' con 'Projects'
    @ManyToOne(() => ProjectsEntity, (project) => project.tasks)
    @JoinColumn({ name: 'project_id' })
    project: ProjectsEntity;
}
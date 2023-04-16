import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsService } from 'src/projects/services/projects.service';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository } from 'typeorm';
import { TasksDTO } from '../dto/tasks.dto';
import { TasksEntity } from '../entities/tasks.entity';

@Injectable()
export class TasksService {

    // Inyección de dependencias
    constructor(@InjectRepository(TasksEntity) private readonly taskRepository: Repository<TasksEntity>,
        private readonly projectService: ProjectsService) { }

    // Método para crear una tarea y asignarla a un proyecto
    public async createTask(body: TasksDTO, projectId: string): Promise<TasksEntity> {
        try {
            // Traer a el proyecto gracias a su ID
            const project = await this.projectService.findProjectById(projectId);

            // En caso de no encontrarlo...
            if (project === undefined) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'No se ha encontrado el proyecto',
                });
            }

            // Guardar la tarea (en el proyecto asignado)
            return await this.taskRepository.save({ ...body, project });
        } catch (error) {
            // En caso de error interno, arrojar el siguiente error
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';
import { ProjectsEntity } from '../entities/projects.entity';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ProjectsService {

    // Inyección de dependencias
    // Para poder utilizar el repositorio que nos ofrece TypeORM
    constructor(@InjectRepository(ProjectsEntity) private readonly projectRepository: Repository<ProjectsEntity>) { }

    // Método para crear un nuevo proyecto
    public async createProject(body: ProjectDTO): Promise<ProjectsEntity> {
        try {
            return await this.projectRepository.save(body);
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para obtener todos los proyectos
    public async findProjects(): Promise<ProjectsEntity[]> {
        try {
            const projects: ProjectsEntity[] = await this.projectRepository.find();
            // Si surge algún error...
            if (projects.length === 0) {
                // Arrojar el siguiente error personalizado
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se encontro resultado',
                });
            }
            return projects;
        } catch (error) {
            // Arrojar error interno
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    // Método para traer a un proyecto en específico (gracias a su ID)
    // También nos traerá a los usuarios que estén asignados a este proyecto
    public async findProjectById(id: string): Promise<ProjectsEntity> {
        try {
            const project = await this.projectRepository
                .createQueryBuilder('project')
                .where({ id })
                .leftJoinAndSelect('project.usersIncludes', 'usersIncludes') // Campo de la entidad + Campo personalziado (Alias)
                .leftJoinAndSelect('usersIncludes.user', 'user') // Campo de la entidad + Campo personalziado (Alias)
                .getOne();
            // Si surge algún error...
            if (!project) {
                // Arrojar el siguiente error personalizado
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No existe proyecto con el id ' + id,
                });
            }
            return project;
        } catch (error) {
            // Arrojar error interno
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    // Método para actualizar a un proyecto en específico (gracias a su ID)
    public async updateProject(body: ProjectUpdateDTO, id: string): Promise<UpdateResult | undefined> {
        try {
            const project: UpdateResult = await this.projectRepository.update(
                id,
                body,
            );
            // Si surge algún error...
            if (project.affected === 0) {
                // Arrojar el siguiente error personalizado
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se pudo actualizar proyecto',
                });
            }
            return project;
        } catch (error) {
            // Arrojar error interno
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    // Método para eliminar a un proyecto en específico (gracias a su ID)
    public async deleteProject(id: string): Promise<DeleteResult | undefined> {
        try {
            const project: DeleteResult = await this.projectRepository.delete(id);
            // Si surge algún error...
            if (project.affected === 0) {
                // Arrojar el siguiente error personalizado
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se pudo borrar proyecto',
                });
            }
            return project;
        } catch (error) {
            // Arrojar error interno
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}

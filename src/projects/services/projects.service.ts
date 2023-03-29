import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';
import { ProjectsEntity } from '../entities/projects.entity';

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
            return await this.projectRepository.find();
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para traer a un proyecto en específico (gracias a su ID)
    public async findProjectById(id: string): Promise<ProjectsEntity> {
        try {
            return await this.projectRepository
                .createQueryBuilder('project')
                .where({ id })
                .getOne();
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para actualizar a un proyecto en específico (gracias a su ID)
    public async updateProject(body: ProjectUpdateDTO, id: string): Promise<UpdateResult | undefined> {
        try {
            const project: UpdateResult = await this.projectRepository.update(
                id,
                body,
            );
            if (project.affected === 0) {
                return undefined;
            }
            return project;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para eliminar a un proyecto en específico (gracias a su ID)
    public async deleteProject(id: string): Promise<DeleteResult | undefined> {
        try {
            const project: DeleteResult = await this.projectRepository.delete(id);
            if (project.affected === 0) {
                return undefined;
            }
            return project;
        } catch (error) {
            throw new Error(error);
        }
    }

}

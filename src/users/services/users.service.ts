import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { UserToProjectDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UsersProjectsEntity } from '../entities/usersProjects.entity';

@Injectable()
export class UsersService {

    // Inyección de dependencias
    // Para poder utilizar los repositorios que nos ofrece TypeORM
    constructor(@InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>,
        @InjectRepository(UsersProjectsEntity) private readonly userProjectsRepository: Repository<UsersProjectsEntity>) {
    }

    // Método para crear un nuevo usuario
    public async createUser(body: UserDTO): Promise<UsersEntity> {
        try {
            return await this.userRepository.save(body);
        } catch (error) {
            // Manejando errores internos
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    // Método para traer a todos los usuarios
    public async findUsers(): Promise<UsersEntity[]> {
        try {
            const users: UsersEntity[] = await this.userRepository.find();
            // Si no se han encontrado usuarios...
            if (users.length === 0) {
                // Arrojar el siguiente error personalizado
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se encontraron resultados',
                });
            }
            return users;
        } catch (error) {
            // Manejando errores internos
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    // Método para traer a un usuario en específico (gracias a su ID)
    // Nos traerá los proyectos (con toda su información) que hayan sido asignados al mismo
    public async findUserById(id: string): Promise<UsersEntity> {
        try {
            const user: UsersEntity = await this.userRepository
                .createQueryBuilder('user')
                .where({ id })
                .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes') // Campo de la entidad + Campo personalizado (Alias)
                .leftJoinAndSelect('projectsIncludes.project', 'project') // Campo de la entidad + Campo personalizado (Alias)
                .getOne();
            // Si no se encontró al usurio...
            if (!user) {
                // Arrojar el siguiente error personalizado
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se encontró resultado',
                });
            }
            return user;
        } catch (error) {
            // Manejando errores internos
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    // Método para asignar proyecto/s a un usuario
    public async relationToProject(body: UserToProjectDTO) {
        try {
            return await this.userProjectsRepository.save(body);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    // Método para actualizar a un usuario en específico (gracias a su ID)
    public async updateUser(body: UserUpdateDTO, id: string): Promise<UpdateResult | undefined> {
        try {
            const user: UpdateResult = await this.userRepository.update(id, body);
            // Si no se pudo actualizar a el usuario...
            if (user.affected === 0) {
                // Arrojar el siguiente error personalizado
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se pudo actualizar',
                });
            }
            return user;
        } catch (error) {
            // Manejando errores internos
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    // Método para eliminar a un usuario en específico (gracias a su ID)
    public async deleteUser(id: string): Promise<DeleteResult | undefined> {
        try {
            const user: DeleteResult = await this.userRepository.delete(id);
            // Si no se pudo borrar a el usuario...
            if (user.affected === 0) {
                // Arrojar el siguiente error personalizado
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se pudo borrar',
                });
            }
            return user;
        } catch (error) {
            // Manejando errores internos
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}

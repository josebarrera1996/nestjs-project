import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';

@Injectable()
export class UsersService {

    // Inyección de dependencias
    // Para poder utilizar el repositorio que nos ofrece TypeORM
    constructor(@InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>) {
    }

    // Método para crear un nuevo usuario
    public async createUser(body: UserDTO): Promise<UsersEntity> {
        try {
            return await this.userRepository.save(body);
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para traer a todos los usuarios
    public async findUsers(): Promise<UsersEntity[]> {
        try {
            return await this.userRepository.find();
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para traer a un usuario en específico (gracias a su ID)
    public async findUserById(id: string): Promise<UsersEntity> {
        try {
            return await this.userRepository
                .createQueryBuilder('user')
                .where({ id })
                .getOne();
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para actualizar a un usuario en específico (gracias a su ID)
    public async updateUser(body: UserUpdateDTO, id: string): Promise<UpdateResult | undefined> {
        try {
            const user: UpdateResult = await this.userRepository.update(id, body);
            if (user.affected === 0) {
                return undefined;
            }
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para eliminar a un usuario en específico (gracias a su ID)
    public async deleteUser(id: string): Promise<DeleteResult | undefined> {
        try {
            const user: DeleteResult = await this.userRepository.delete(id);
            if (user.affected === 0) {
                return undefined;
            }
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
}

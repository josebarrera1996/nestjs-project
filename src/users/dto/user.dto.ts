import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ROLES, ACCESS_LEVEL } from "src/constants/roles";
import { UsersEntity } from "../entities/users.entity";
import { ProjectsEntity } from "src/projects/entities/projects.entity";

// Utilizando DTO para validar la entidad 'users'
// Utilizando los decoradores de 'class-validator'
export class UserDTO {

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(ROLES)
    role: ROLES;
}

// DTO para realizar validaciones a la hora de actualizar al usuario
// El decorador a destacar es 'IsOptional' (ya que se puede elegir que campo/s actualizar)
export class UserUpdateDTO {

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsNumber()
    age: number;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsEnum(ROLES)
    role: ROLES;
}

// Utilizando DTO para validar la entidad 'usersProjects'
// Utilizando los decoradores de 'class-validator'
export class UserToProjectDTO {

    @IsNotEmpty()
    @IsUUID()
    user: UsersEntity;

    @IsNotEmpty()
    @IsUUID()
    project: ProjectsEntity;

    @IsNotEmpty()
    @IsEnum(ACCESS_LEVEL)
    accessLevel: ACCESS_LEVEL;
}
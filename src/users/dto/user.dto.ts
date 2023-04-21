import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ROLES, ACCESS_LEVEL } from "src/constants/roles";
import { UsersEntity } from "../entities/users.entity";
import { ProjectsEntity } from "src/projects/entities/projects.entity";

// Utilizando DTO para validar la entidad 'users'
// Utilizando los decoradores de 'class-validator'
// Utilizando '@ApiProperty' para documentar estas propiedades
export class UserDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    age: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ROLES)
    role: ROLES;
}

// DTO para realizar validaciones a la hora de actualizar al usuario
// El decorador a destacar es 'IsOptional' (ya que se puede elegir que campo/s actualizar)
export class UserUpdateDTO {

    @ApiProperty()
    @IsOptional()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    age: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    username: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(ROLES)
    role: ROLES;
}

// Utilizando DTO para validar la entidad 'usersProjects'
// Utilizando los decoradores de 'class-validator'
export class UserToProjectDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    user: UsersEntity;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    project: ProjectsEntity;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ACCESS_LEVEL)
    accessLevel: ACCESS_LEVEL;
}
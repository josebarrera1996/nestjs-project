import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// Utilizando DTO para validar la entidad 'projects'
// Utilizando los decoradores de 'class-validator'
export class ProjectDTO {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}

// DTO para realizar validaciones a la hora de actualizar al project
// El decorador a destacar es 'IsOptional' (ya que se puede elegir que campo/s actualizar)
export class ProjectUpdateDTO {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;
}
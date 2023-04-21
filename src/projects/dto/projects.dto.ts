import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// Utilizando DTO para validar la entidad 'projects'
// Utilizando los decoradores de 'class-validator'
// Utilizando 'ApiProperty' para documentar estas propiedades
export class ProjectDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;
}

// DTO para realizar validaciones a la hora de actualizar al project
// El decorador a destacar es 'IsOptional' (ya que se puede elegir que campo/s actualizar)
export class ProjectUpdateDTO {

    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;
}
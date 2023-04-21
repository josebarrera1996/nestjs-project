import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { STATUS_TASK } from 'src/constants/status-task';
import { ProjectDTO } from 'src/projects/dto/projects.dto';

// Utilizando DTO para validar la entidad 'tasks'
// Utilizando los decoradores de 'class-validator'
// Utilizando 'ApiProperty' para documentar estas propiedades
export class TasksDTO {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taskDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(STATUS_TASK)
  status: STATUS_TASK;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  responsableName: string;

  @ApiProperty()
  @IsOptional()
  project?: ProjectDTO;
}
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { STATUS_TASK } from 'src/constants/status-task';
import { ProjectDTO } from 'src/projects/dto/projects.dto';

// Utilizando DTO para validar la entidad 'tasks'
// Utilizando los decoradores de 'class-validator'
export class TasksDTO {

  @IsNotEmpty()
  @IsString()
  taskName: string;

  @IsNotEmpty()
  @IsString()
  taskDescription: string;

  @IsNotEmpty()
  @IsEnum(STATUS_TASK)
  status: STATUS_TASK;

  @IsNotEmpty()
  @IsString()
  responsableName: string;

  @IsOptional()
  project?: ProjectDTO;
}
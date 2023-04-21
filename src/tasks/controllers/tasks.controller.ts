import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { TasksDTO } from '../dto/tasks.dto';
import { TasksService } from '../services/tasks.service';
import { ApiParam, ApiTags, ApiHeader, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tasks') // Swagger -> Tasks
@Controller('tasks') // Endpoint -> api/tasks
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TasksController {

    // Inyección de dependencias
    constructor(private readonly tasksService: TasksService) { }

    @ApiParam({ name: 'projectId' }) // Nombre del parámetro
    @ApiHeader({ name: 'codrr_token' }) // header para ingresar el respectivo token
    @ApiResponse({ status: 200, description: 'Actualización exitosa :)' })
    @ApiResponse({ status: 401, description: 'No tienes permisos para esta operación' })
    @AccessLevel('DEVELOPER')
    @Post('create/:projectId')
    public async createTask(@Body() body: TasksDTO, @Param('projectId') projectId: string) {
        return this.tasksService.createTask(body, projectId);
    }
}

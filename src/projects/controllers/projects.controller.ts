import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';
import { ProjectsService } from '../services/projects.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';

// Endpoint -> api/projects
@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {

    // Inyección de dependencias
    constructor(private readonly projectService: ProjectsService) { }

    @AdminAccess()
    @Post('create')
    // Utilización del respectivo DTO para la validación de datos
    public async createProject(@Body() body: ProjectDTO) {
        return await this.projectService.createProject(body);
    }

    @Get('all')
    public async findAllProjects() {
        return await this.projectService.findProjects();
    }

    @Get(':projectId')
    // Se realizará el parseo del parámetro del 'id'
    public async findProjectById(@Param('projectId', new ParseUUIDPipe()) id: string) {
        return await this.projectService.findProjectById(id);
    }

    @AccessLevel('OWNER')
    @Put('edit/:projectId')
    // Se realizará el parseo del parámetro del 'id'
    // Utilización del respectivo DTO para la validación de datos
    public async updateProject(@Param('projectId', new ParseUUIDPipe()) id: string, @Body() body: ProjectUpdateDTO) {
        return await this.projectService.updateProject(body, id);
    }

    @AccessLevel('OWNER')
    @Delete('delete/:projectId')
    // Se realizará el parseo del parámetro del 'id'
    public async deleteProject(@Param('projectId', new ParseUUIDPipe()) id: string) {
        return await this.projectService.deleteProject(id);
    }
}

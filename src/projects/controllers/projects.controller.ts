import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from '@nestjs/common';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';
import { ProjectsService } from '../services/projects.service';

// Endpoint -> api/projects
@Controller('projects')
export class ProjectsController {

    // Inyección de dependencias
    constructor(private readonly projectService: ProjectsService) { }

    @Post('create')
    // Utilización del respectivo DTO para la validación de datos
    public async createProject(@Body() body: ProjectDTO) {
        return await this.projectService.createProject(body);
    }

    @Get('all')
    public async findAllProjects() {
        return await this.projectService.findProjects();
    }

    @Get(':id')
    // Se realizará el parseo del parámetro del 'id'
    public async findProjectById(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.projectService.findProjectById(id);
    }

    @Put('edit/:id')
    // Se realizará el parseo del parámetro del 'id'
    // Utilización del respectivo DTO para la validación de datos
    public async updateProject(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: ProjectUpdateDTO) {
        return await this.projectService.updateProject(body, id);
    }

    @Delete('delete/:id')
    // Se realizará el parseo del parámetro del 'id'
    public async deleteProject(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.projectService.deleteProject(id);
    }
}

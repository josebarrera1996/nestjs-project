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
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiTags, ApiParam, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

@ApiTags('Projects') // Swagger -> Projects
@Controller('projects') // Endpoint -> api/projects
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {

    // Inyección de dependencias
    constructor(private readonly projectService: ProjectsService) { }

    @ApiParam({ name: 'userId' }) // Nombre del parámetro
    @ApiHeader({ name: 'codrr_token' }) // header para ingresar el respectivo token
    @ApiResponse({ status: 200, description: 'Creación exitosa :)' })
    @ApiResponse({ status: 401, description: 'No tienes permisos para esta operación' })
    @Roles('CREATOR')
    @Post('create/userOwner/:userId')
    // Utilización del respectivo DTO para la validación de datos
    public async createProject(@Body() body: ProjectDTO, @Param('userId') userId: string) {
        return await this.projectService.createProject(body, userId);
    }

    @ApiResponse({ status: 200, description: 'Se encontraron los resultados :)' })
    @ApiResponse({ status: 400, description: 'No se encontraron resultados' })
    @PublicAccess()
    @Get('all')
    public async findAllProjects() {
        return await this.projectService.findProjects();
    }

    @ApiParam({ name: 'projectId' }) // Nombre del parámetro
    @ApiResponse({ status: 200, description: 'Se encontró a el usuario :)' })
    @ApiResponse({ status: 400, description: 'No se encontró resultado' })
    @PublicAccess()
    @Get(':projectId')
    // Se realizará el parseo del parámetro del 'id'
    public async findProjectById(@Param('projectId', new ParseUUIDPipe()) id: string) {
        return await this.projectService.findProjectById(id);
    }

    @ApiParam({ name: 'projectId' }) // Nombre del parámetro
    @ApiHeader({ name: 'codrr_token' }) // header para ingresar el respectivo token
    @ApiResponse({ status: 200, description: 'Actualización exitosa :)' })
    @ApiResponse({ status: 400, description: 'No se pudo actualizar' })
    @ApiResponse({ status: 401, description: 'No tienes permisos para esta operación' })
    @AccessLevel('OWNER')
    @Put('edit/:projectId')
    // Se realizará el parseo del parámetro del 'id'
    // Utilización del respectivo DTO para la validación de datos
    public async updateProject(@Param('projectId', new ParseUUIDPipe()) id: string, @Body() body: ProjectUpdateDTO) {
        return await this.projectService.updateProject(body, id);
    }

    @ApiParam({ name: 'projectId' }) // Nombre del parámetro
    @ApiHeader({ name: 'codrr_token' }) // header para ingresar el respectivo token
    @ApiResponse({ status: 204, description: 'Borrado exitoso :)' })
    @ApiResponse({ status: 400, description: 'No se pudo borrar' })
    @ApiResponse({ status: 401, description: 'No tienes permisos para esta operación' })
    @AccessLevel('OWNER')
    @Delete('delete/:projectId')
    // Se realizará el parseo del parámetro del 'id'
    public async deleteProject(@Param('projectId', new ParseUUIDPipe()) id: string) {
        return await this.projectService.deleteProject(id);
    }

    // Implementando método de prueba para trabajar un provider de HttpModule
    @PublicAccess()
    @Get('list/api')
    public async listApi() {
        return this.projectService.listApi();
    }
}

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import { ApiHeader, ApiHeaders, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDTO, UserUpdateDTO, UserToProjectDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';

@ApiTags('Users') // Swagger -> Users
@Controller('users') // Endpoint -> api/users
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class UsersController {

    // Inyección de dependencias
    constructor(private readonly usersService: UsersService) { }

    @ApiResponse({ status: 200, description: 'Registración exitosa :)' })
    @PublicAccess()
    @Post('register')
    // Utilizando el respectivo DTO para validar lo ingresado
    public async registerUser(@Body() body: UserDTO) {
        return await this.usersService.createUser(body);
    }

    @ApiHeader({ name: 'codrr_token' }) // header para ingresar el respectivo token
    @ApiResponse({ status: 200, description: 'Se encontraron los resultados :)' })
    @ApiResponse({ status: 400, description: 'No se encontraron resultados' })
    @ApiResponse({ status: 401, description: 'No tienes permisos para esta operación' })
    @AdminAccess()
    @Get('all')
    public async findAllUsers() {
        return await this.usersService.findUsers();
    }


    @ApiParam({ name: 'id' }) // Nombre del parámetro
    @ApiHeader({ name: 'codrr_token' }) // header para ingresar el respectivo token
    @ApiResponse({ status: 200, description: 'Se encontró a el usuario :)' })
    @ApiResponse({ status: 400, description: 'No se encontró resultado' })
    @Get(':id')
    // Se realizará un parseo del parámetro del 'id'
    public async findUserById(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.usersService.findUserById(id);
    }

    @ApiParam({ name: 'projectId' }) // Nombre del parámetro
    @ApiHeader({ name: 'codrr_token' }) // header para ingresar el respectivo token
    @ApiResponse({ status: 200, description: 'Usuario añadido al proyecto :)' })
    @ApiResponse({ status: 401, description: 'No tienes permisos para esta operación' })
    @AccessLevel('OWNER')
    @Post('add-to-project/:projectId')
    // Utilizando el respectivo DTO para validar lo ingresado
    public async addToProject(@Body() body: UserToProjectDTO, @Param('projectId', new ParseUUIDPipe()) id: string) {
        return await this.usersService.relationToProject({
            ...body,
            project: id as unknown as ProjectsEntity
        });
    }

    @ApiParam({ name: 'id' }) // Nombre del parámetro
    @ApiHeader({ name: 'codrr_token' }) // header para ingresar el respectivo token
    @ApiResponse({ status: 200, description: 'Actualización exitosa :)' })
    @ApiResponse({ status: 400, description: 'No se pudo actualizar' })
    @Put('edit/:id')
    // Se realizará un parseo del parámetro del 'id'
    // Utilizando el respectivo DTO para validar lo ingresado
    public async updateUser(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UserUpdateDTO,) {
        return await this.usersService.updateUser(body, id);
    }

    @ApiParam({ name: 'id' }) // Nombre del parámetro
    @ApiHeader({ name: 'codrr_token' }) // header para ingresar el respectivo token
    @ApiResponse({ status: 204, description: 'Borrado exitoso :)' })
    @ApiResponse({ status: 400, description: 'No se pudo borrar' })
    @ApiResponse({ status: 401, description: 'No tienes permisos para esta operación' })
    @AdminAccess()
    @Delete('delete/:id')
    // Se realizará un parseo del parámetro del 'id'
    public async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.usersService.deleteUser(id);
    }
}

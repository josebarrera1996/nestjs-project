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
import { UserDTO, UserUpdateDTO, UserToProjectDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';

// Endpoint -> api/users
@Controller('users')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class UsersController {

    // Inyección de dependencias
    constructor(private readonly usersService: UsersService) { }

    @PublicAccess()
    @Post('register')
    // Utilizando el respectivo DTO para validar lo ingresado
    public async registerUser(@Body() body: UserDTO) {
        return await this.usersService.createUser(body);
    }

    @AdminAccess()
    @Get('all')
    public async findAllUsers() {
        return await this.usersService.findUsers();
    }


    @Get(':id')
    // Se realizará un parseo del parámetro del 'id'
    public async findUserById(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.usersService.findUserById(id);
    }

    @AccessLevel('OWNER')
    @Post('add-to-project/:projectId')
    // Utilizando el respectivo DTO para validar lo ingresado
    public async addToProject(@Body() body: UserToProjectDTO, @Param('projectId', new ParseUUIDPipe()) id: string) {
        return await this.usersService.relationToProject({
            ...body,
            project: id as unknown as ProjectsEntity
        });
    }

    @Put('edit/:id')
    // Se realizará un parseo del parámetro del 'id'
    // Utilizando el respectivo DTO para validar lo ingresado
    public async updateUser(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UserUpdateDTO,) {
        return await this.usersService.updateUser(body, id);
    }

    @Delete('delete/:id')
    // Se realizará un parseo del parámetro del 'id'
    public async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.usersService.deleteUser(id);
    }
}

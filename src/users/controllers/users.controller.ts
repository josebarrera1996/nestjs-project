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

// Endpoint -> api/users
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {

    // Inyección de dependencias
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    // Utilizando el respectivo DTO para validar lo ingresado
    public async registerUser(@Body() body: UserDTO) {
        return await this.usersService.createUser(body);
    }

    @Get('all')
    public async findAllUsers() {
        return await this.usersService.findUsers();
    }

    @PublicAccess()
    @Get(':id')
    // Se realizará un parseo del parámetro del 'id'
    public async findUserById(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.usersService.findUserById(id);
    }

    @Post('add-to-project')
    // Utilizando el respectivo DTO para validar lo ingresado
    public async addToProject(@Body() body: UserToProjectDTO) {
      return await this.usersService.relationToProject(body);
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

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
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

// Endpoint -> api/users
@Controller('users')
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

    @Get(':id')
    // Se realizará un parseo del parámetro del 'id'
    public async findUserById(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.usersService.findUserById(id);
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

import {
    Body,
    Controller,
    Post,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth') // Swagger -> Auth
@Controller('auth') // Endpoint -> api/auth
export class AuthController {

    // Inyección de dependencias
    constructor(private readonly authService: AuthService) { }

    // Método para realizar el login
    @ApiResponse({ status: 200, description: 'Login exitoso :)' })
    @Post('login')
    async login(@Body() { username, password }: AuthDTO) {

        // Realizando la validación del usuario
        const userValidate = await this.authService.validateUser(username, password);

        // Si el mismo no es válido...
        if (!userValidate) {
            throw new UnauthorizedException('Data not valid');
        }

        // Si es válido, generar el JWT y retornarlo
        const jwt = await this.authService.generateJWT(userValidate);
        return jwt;
    }

}

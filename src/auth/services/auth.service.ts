import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { AuthResponse, PayloadToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {

    // Inyección de dependencias
    // Para poder trabajar con la lógica del 'UsersService'
    constructor(private readonly userService: UsersService) { }

    // Método para validar a el usuario (a través de su username/email y password)
    public async validateUser(username: string, password: string): Promise<UsersEntity | null> {

        // Traer a un usuario en base a su 'username'
        const userByUsername = await this.userService.findBy({
            key: 'username',
            value: username,
        });

        // Traer a un usuario en base a su 'email'
        const userByEmail = await this.userService.findBy({
            key: 'email',
            value: username, // Este valor representa a el 'email'
        });

        // Si es por 'username'
        if (userByUsername) {
            // Realizar la comparación entre la password encriptada y la de texto plano
            const match = await bcrypt.compare(password, userByUsername.password);
            if (match) return userByUsername;
        }

        // Si es por 'email'
        if (userByEmail) {
            // Realizar la comparación entre la password encriptada y la de texto plano
            const match = await bcrypt.compare(password, userByEmail.password);
            if (match) return userByEmail;
        }

        return null;
    }

    // Método para firmar el JWT (y luego generarlo)
    public signJWT({ payload, secret, expires }: {
        payload: jwt.JwtPayload;
        secret: string;
        expires: number | string;
    }): string {
        return jwt.sign(payload, secret, { expiresIn: expires });
    }

    // Método para generar el JWT
    public async generateJWT(user: UsersEntity): Promise<AuthResponse> {

        // Método para obtener a el usuario gracias a su ID
        const getUser = await this.userService.findUserById(user.id);

        // Preparando el payload
        const payload: PayloadToken = {
            role: getUser.role,
            sub: getUser.id
        };

        // Objeto a retornar
        return {
            // Token
            accessToken: this.signJWT({
                payload,
                secret: process.env.JWT_SECRET,
                expires: '1h'
            }),
            // User con sus propiedades
            user
        };
    }
}

import { ROLES } from 'src/constants/roles';
import { UsersEntity } from 'src/users/entities/users.entity';

// Interfaz para trabajar con el 'payload' del token
export interface PayloadToken {
    sub: string;
    role: ROLES;
}

// Interfaz para trabajar con el 'body' al realizar la autenticación
export interface AuthBody {
    username: string;
    password: string;
}

// Interfaz para trabajar con lo que obtendremos luego con la autenticación
export interface AuthResponse {
    accessToken: string;
    user: UsersEntity;
}
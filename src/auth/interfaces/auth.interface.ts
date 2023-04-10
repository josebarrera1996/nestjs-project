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

// Interfaz para trabajar con el resultado obtenido del Token
export interface AuthTokenResult {
    role: string;
    sub: string;
    lat: number;
    exp: number;
}

// Interfaz para trabajar cuando el token haya expirado o no
export interface IUseToken {
    role: string;
    sub: string;
    isExpired: boolean;
}

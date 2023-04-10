import { AuthTokenResult, IUseToken } from "src/auth/interfaces/auth.interface";
import * as jwt from 'jsonwebtoken';

// Método para poder utilizar el token (siempre y cuando este no haya expirado)
export const useToken = (token: string): IUseToken | string => {
    try {
        // Decodificando el token
        const decode = jwt.decode(token) as AuthTokenResult;

        // Fechas: actual & fecha de expiración del token
        const currentDate = new Date();
        const expiresDate = new Date(decode.exp);

        // Retonar el objeto (un payload customizado)
        return {
            sub: decode.sub,
            role: decode.role,
            isExpired: +expiresDate <= +currentDate / 1000 // Fecha de expiración menor o igual a la fecha actual
        };
    } catch (error) {
        // En caso de error, arrojar el siguiente error
        return 'Token is invalid';
    }
};
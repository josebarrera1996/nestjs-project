import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLIC_KEY } from 'src/constants/key-decorators';
import { UsersService } from 'src/users/services/users.service';
import { useToken } from 'src/utils/use.token';
import { IUseToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {

  // Inyección de dependencias
  constructor(private readonly userService: UsersService, private readonly reflector: Reflector) { }

  // Guard para controlar sobre si se puede seguir o no con la ejecución de los métodos del programa
  // En esta ocasión se verificará que:
  // - El método a ejecutar sea de acceso público 
  // - Si no es de acceso público, chequear si el usuario está autenticado (con su token)
  async canActivate(context: ExecutionContext) {

    // Leer el decorator (a través del 'reflector')
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    // Si es público...
    if (isPublic) {
      return true;
    }

    /* Si no es público, empezaremos a trabajar con los 'headers' */

    // Enfocándonos en el 'Request'
    const req = context.switchToHttp().getRequest<Request>(); 

    // Especificando el 'header' del token
    const token = req.headers['codrr_token'];

    // Si el token no existe o surge algún otro error...
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid token');
    }

    // Si el token es válido, procederemos a manejarlo
    const manageToken: IUseToken | string = useToken(token);

    // Si es de tipo 'string'...
    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    // Si ha expirado...
    if (manageToken.isExpired) {
      throw new UnauthorizedException('Token expired');
    }

    // Obtener la propiedad 'sub' del token, que en verdad hace referencia a el 'id' del usuarip
    const { sub } = manageToken;

    // Traer a el usuario según esta propiedad
    const user = await this.userService.findUserById(sub);

    // Si no existe...
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    // Inyección
    // Asignar a las propiedades del 'request' los valores obtenidos al traer al usuario
    req.idUser = user.id
    req.roleUser = user.role

    return true;
  }
}

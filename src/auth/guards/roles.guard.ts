import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';
import { ROLES } from 'src/constants/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  
  // Inyección de dependencias
  constructor(private readonly reflector: Reflector) { }
  
  // Guard para controlar sobre si se puede seguir o no con la ejecución de los métodos del programa
  // En esta ocasión se verificará:
  // - El método a ejecutar sea de acceso público 
  // - El rol del usuario
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

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

    // Obtener los roles a través del reflector
    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    // Obtener el rol de 'admin' a través del reflector
    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    // Enfocándonos en el 'Request'
    const req = context.switchToHttp().getRequest<Request>();

    // Obtener la siguiente propiedad
    const { roleUser } = req;

    if (roles === undefined) { // Si no existen los roles...
      if (!admin) { // Si el usuario no es de tipo 'admin'...
        return true;
      } else if (admin && roleUser === admin) { // Si existe 'admin' y el usuario tiene este rol...
        return true;
      } else {
        // En caso de error, arrojar la siguiente excepción
        throw new UnauthorizedException('No tienes permisos para esta operacion');
      }
    }

    // Si el usuario tiene el rol de 'admin' dentro de sus roles...
    if (roleUser === ROLES.ADMIN) {
      return true
    }

    // Si existen los roles, chequear si alguno/s coincide/n con el/los del user
    const isAuth = roles.some((role) => role === roleUser);

    // En caso de que no haya coincidencias, arrojar el siguiente error...
    if (!isAuth) {
      throw new UnauthorizedException('No tienes permisos para esta operacion');
    }
    return true;
  }
}

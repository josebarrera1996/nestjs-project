import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import {
  ACCESS_LEVEL_KEY,
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES_KEY,
} from 'src/constants/key-decorators';
import { ACCESS_LEVEL, ROLES } from 'src/constants/roles';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {

  // Inyección de dependencias
  constructor(private readonly reflector: Reflector, private readonly userService: UsersService) { }

  // Guard para controlar sobre si se puede seguir o no con la ejecución de los métodos del programa
  // En esta ocasión se verificará:
  // - El método a ejecutar sea de acceso público 
  // - El nivel de acceso del usuario en los proyectos
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

    // Obtener los roles a través del reflector
    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    // Obtener los niveles de acceso a través del reflector
    const accessLevel = this.reflector.get<keyof typeof ACCESS_LEVEL>(
      ACCESS_LEVEL_KEY,
      context.getHandler(),
    );

    // Obtener el rol de 'admin' a través del reflector 
    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    // Enfocándonos en el 'Request'
    const req = context.switchToHttp().getRequest<Request>();

    // Obteniendo las siguientes propiedades 
    const { roleUser, idUser } = req;

    if (accessLevel === undefined) { // Si no existen los niveles de acceso...
      if (roles === undefined) { // Si no existen los roles...
        if (!admin) { // Si no existe el admin...
          return true;
        } else if (admin && roleUser === admin) { // Si existe 'admin' y el usuario tiene este rol...
          return true;
        } else {
          // En caso de error, arrojar la siguiente excepción
          throw new UnauthorizedException('No tienes permisos para esta operacion');
        }
      }
    }

    // Si el usuario tiene el rol de 'admin' dentro de sus roles...
    if (roleUser === ROLES.ADMIN) {
      return true;
    }

    // Encontrar a el usuario gracias a su ID
    const user = await this.userService.findUserById(idUser);

    // Verificar si hay relación entre el usuario y el proyecto
    const userExistInProject = user.projectsIncludes.find((project) => project.project.id === req.params.projectId);

    // Si no hay relación...
    if (userExistInProject === undefined) {
      throw new UnauthorizedException('No formas parte del proyecto');
    }

    // Si no cumple con el nivel de acceso determinado...
    if (ACCESS_LEVEL[accessLevel] !== userExistInProject.accessLevel) {
      throw new UnauthorizedException('No tienes el nivel de acceso necesario');
    }

    return true;
  }
}

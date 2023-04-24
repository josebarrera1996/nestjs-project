import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';
import { UsersService } from 'src/users/services/users.service';
import { HttpCustomService } from 'src/providers/http/http.service';
import { ProvidersModule } from 'src/providers/providers.module';

@Module({
  // Inyección de módulos
  imports: [
    TypeOrmModule.forFeature([ProjectsEntity, UsersProjectsEntity]), // Habilitando el ORM para las entidades alojadas,
    ProvidersModule // Habilitando el Provider para este módulo
  ],
  providers: [ProjectsService, UsersService, HttpCustomService],
  controllers: [ProjectsController]
})
export class ProjectsModule { }

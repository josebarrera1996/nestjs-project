import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';
import { UsersService } from 'src/users/services/users.service';

@Module({
  // Inyección de módulos
  imports: [
    TypeOrmModule.forFeature([ProjectsEntity, UsersProjectsEntity]) // Habilitando el ORM para las entidades alojadas
  ],
  providers: [ProjectsService, UsersService],
  controllers: [ProjectsController]
})
export class ProjectsModule { }

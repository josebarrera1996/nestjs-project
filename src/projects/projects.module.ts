import { Module } from '@nestjs/common';
import { ProjectsService  } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';

@Module({
  // Inyección de módulos
  imports: [
    TypeOrmModule.forFeature([ProjectsEntity]) // Habilitando el ORM para la entidad alojada
  ],
  providers: [ProjectsService ],
  controllers: [ProjectsController]
})
export class ProjectsModule {}

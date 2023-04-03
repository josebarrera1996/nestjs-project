import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { UsersProjectsEntity } from './entities/usersProjects.entity';

@Module({
  // Inyección de módulos
  imports: [
    TypeOrmModule.forFeature([UsersEntity, UsersProjectsEntity]) // Habilitando el ORM para las entidades alojadas
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}

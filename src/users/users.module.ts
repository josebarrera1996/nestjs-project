import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';

@Module({
  // Inyección de módulos
  imports: [
    TypeOrmModule.forFeature([UsersEntity]) // Habilitando el ORM para la entidad alojada
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}

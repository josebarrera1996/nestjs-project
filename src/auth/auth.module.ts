import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/services/users.service';

@Global() // Haciendo global a este módulo (para que pueda ser accedido desde cualquier parte)
@Module({
  imports: [UsersModule], // Para poder trabajar con el módulo de 'UsersModule'
  providers: [AuthService, UsersService], // Para poder trabajar con la lógica del 'UsersService'
  controllers: [AuthController]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`, // El valor será asignado al ejecutar el script
      isGlobal: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}

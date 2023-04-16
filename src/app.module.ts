import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    // Configuración para utilizar variables de entorno
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`, // El valor será asignado al ejecutar el script
      isGlobal: true,
    }),
    // Configuración de TypeORM para acceder a las opciones de configuración del DataSource
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    UsersModule,
    ProjectsModule,
    AuthModule,
    TasksModule,
  ]
})
export class AppModule { }

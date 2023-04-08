import { ConfigService } from '@nestjs/config/dist';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

// Método inicializador de la app
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middlewares
  app.use(morgan('dev')); // morgan en modo 'development'
  app.useGlobalPipes(new ValidationPipe({ // Habilitando el uso de Pipes a nivel global, para poder realizar validaciones 
    // Propiedades
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector)); // Para poder utilizar 'class-transformer' (poder utilizar 'Exclude')

  // Llamando al servicio del 'ConfigModule'
  const configService = app.get(ConfigService);
  // console.log(configService.get('PORT'));

  // Implementando CORS
  app.enableCors(CORS);

  // Implementando el prefijo global 'api' para toda la app
  app.setGlobalPrefix('api');

  // Levantando el servidor
  await app.listen(configService.get('PORT')); // Accediendo a la variable de entorno

  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();

import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// Configuración para poder utilizar las variables de entorno (dependiendo si es para producción o desarrollo)
ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
});

// Inicializando a el 'ConfigService' para acceder a las variables de entorno
const configService = new ConfigService();

// Configuración para lograr la conexión con la B.D (así como la creación de entidades, migraciones, etc)
export const DataSourceConfig: DataSourceOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy()
};

// Instanciación del 'DataSource'
export const AppDS = new DataSource(DataSourceConfig);
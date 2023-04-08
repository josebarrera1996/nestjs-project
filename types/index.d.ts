// Archivo de 'declaraciones' para poder trabajar mejor con variables de entorno
// Al poder acceder a ellas con 'process.env' (gracias a NodeJS.ProcessEnv)
declare namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        DB_HOST: string;
        DB_PORT: number;
        DB_USER: string;
        DB_PASSWORD: string;
        DB_NAME: string;
        HASH_SALT: number;
        JWT_SECRET: string;
    }
}
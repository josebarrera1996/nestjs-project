/* eslint-disable prettier/prettier */
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// CORS
export const CORS: CorsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Métodos habilitados
  credentials: true,
};

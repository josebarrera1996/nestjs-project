import { SetMetadata } from '@nestjs/common';
import { ACCESS_LEVEL_KEY } from 'src/constants/key-decorators';
import { ACCESS_LEVEL } from 'src/constants/roles';

// Decorator para el manejo del nivel de acceso
export const AccessLevel = (level: keyof typeof ACCESS_LEVEL) =>
    SetMetadata(ACCESS_LEVEL_KEY, level);
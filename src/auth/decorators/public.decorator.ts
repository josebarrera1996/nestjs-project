import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from 'src/constants/key-decorators';

// Decorator de acceso público
export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);
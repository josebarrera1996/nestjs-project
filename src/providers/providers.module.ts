import { Global, Module } from '@nestjs/common';
import { HttpCustomService } from './http/http.service';
import { HttpModule } from '@nestjs/axios';
import { HttpController } from './http/http.controller';

@Global()
@Module({
    imports: [HttpModule],
    providers: [HttpCustomService],
    exports: [HttpModule, HttpCustomService],
    controllers: [HttpController]
})
// Módulo que nos permitirá conectarnos con módulos de otros proveedores
export class ProvidersModule { }

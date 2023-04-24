import { Controller, Get } from '@nestjs/common';
import { HttpCustomService } from './http.service';

@Controller('http')
export class HttpController {

    // Inyección de dependencias
    constructor(private readonly httpService: HttpCustomService) {}

    @Get('list/api')
    public async listApi() {
        return this.httpService.apiFindAll();
    }
}

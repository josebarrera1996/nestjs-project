import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';
import { firstValueFrom } from 'rxjs';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class HttpCustomService {

    // Inyección de dependencias
    constructor(private readonly httpService: HttpService) { }

    // Método para traer a todos los personajes de la siguiente api
    public async apiFindAll() {
        try {
            const response = await firstValueFrom(
                this.httpService.get('https://rickandmortyapi.com/api/character'),
            );
            return response.data;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}

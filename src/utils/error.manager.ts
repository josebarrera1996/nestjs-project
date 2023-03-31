import { HttpException, HttpStatus } from '@nestjs/common';

// Clase para el manejo de los errores a nivel general
export class ErrorManager extends Error {

    // Inyección de dependencias
    constructor({ type, message }: {
        // Propiedades
        type: keyof typeof HttpStatus; // En esta propiedad alojaremos todas las 'key' que tiene HttpStatus (que es un ENUM)
        message: string;
    }) {
        super(`${type} :: ${message}`);
    }

    // Método para manejar la creación de los mensajes de error y sus respectivos códigos HTTP
    public static createSignatureError(message: string) {
        const name = message.split(' :: ')[0];
        if (name) {
            // Error personalizado
            throw new HttpException(message, HttpStatus[name]);
        } else {
            // Error interno
            throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";
import { AuthBody } from "../interfaces/auth.interface";

// DTO para realizar la validación en lo pasado por el 'body'
// Utilizando 'ApiProperty' para documentar estas propiedades
export class AuthDTO implements AuthBody {

    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string
}